import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import mammoth from "mammoth";
import e from "express";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}) 

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function uploadImage(file: Express.Multer.File, bucket: string): Promise<string> {
    const extension = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${extension}`;
    

    const { error } = await supabase.storage.from(bucket).upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
    });

    if (error) {
        throw new Error("Erro ao realizar o upload da imagem!");
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

    const fixedUrl = data.publicUrl.replace(/([^:]\/)\/+/g, "1").replace(/ /g, "%20");

    return fixedUrl;
}

export async function uploadAgentDocument(file: Express.Multer.File, tenantId: string): Promise<{ fileUrl: string; extractedText: string; documentId?: string; skipped?: boolean }> {
    const extension = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${extension}`;
    const filePath = `${tenantId}/${fileName}`;

    const allowedExtensions = ["pdf", "docx", "txt"];
    if (!extension || !allowedExtensions.includes(extension)) {
        throw new Error("Tipo de arquivo não suportado. Por favor, envie um arquivo do tipo .pdf, .docx ou .txt");
    }

    const { error } = await supabase.storage.from("agent-documents").upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
    });

    if (error) {
        throw new Error("Erro ao enviar documento!");
    }

    const { data } = supabase.storage.from("agent-documents").getPublicUrl(filePath);
    const fileUrl = data.publicUrl;

    let extractedText = "";
    try {
        if (extension === "pdf") {
            const pdfParse = await import("pdf-parse").then(mod => mod.default);
            const parsed = await pdfParse(file.buffer);
            extractedText = parsed.text || "";
        } else if (extension === "docx") {
            const parsed = await mammoth.extractRawText({ buffer: file.buffer });
            extractedText = parsed.value || "";
        } else if (extension === "txt"){
            extractedText = file.buffer.toString("utf-8");
        }
    } catch (err: any){
        console.warn("Erro ao extrair o texto do documento!", err);
    }

    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: extractedText
    });

    const embedding = embeddingResponse.data[0].embedding;

    const {data: similar, error: simError } = await supabase.rpc("match_documents", {
        tenant_id: tenantId,
        query_embedding: embedding,
        similarity_threshold: 0.97,
        match_count: 1,
    });

    if(simError) {
        console.warn("Erro ao consultar documentos similares: ", simError);
    }

    if(similar && similar.length > 0){
        return {fileUrl, extractedText, skipped: true};
    }

    const id = uuidv4();

    const {data: insertedDoc, error: insertError} = await supabase.from("AgentDocument").insert({
        id,
        tenantId,
        name: file.originalname,
        fileUrl,
        content: extractedText,
        embedding,
    }).select("id").single();

    if(insertError){
        console.warn(insertError);
        throw new Error("Erro ao salvar o documento no banco!",);
    }

    return { fileUrl, extractedText, documentId: insertedDoc.id };
}