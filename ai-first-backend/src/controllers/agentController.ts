import { Response } from "express";
import { uploadAgentDocument } from "../services/uploadService.js";
import { userRequest } from "../types/express";
import { PrismaClient } from "@prisma/client";
import { getPromptByTenant, upsertPrompt } from "../services/agentService.js";
import { error } from "console";

const prisma = new PrismaClient();

export async function uploadAgentDocumentHandler(req: userRequest, res: Response) {
    try {
        const file = req.file;
        const tenantId = req.user!.tenantId;

        const { fileUrl, extractedText, documentId, skipped } = await uploadAgentDocument(file!, tenantId);
        res.status(200).json({ message: skipped ? "Documento ignorado por similaridade" : "Documento enviado com sucesso!", documentId, fileUrl});
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function upsertPromptHandler(req: userRequest, res: Response) {
    try {
        const {systemPrompt} = req.body;

        const prompt = await upsertPrompt(req.user!.tenantId, systemPrompt);
        res.status(200).json({ message: "Prompt salvo com sucesso!", prompt });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export async function getPromptByTenantHandler(req: userRequest, res: Response) {
    try {
        const prompt = await getPromptByTenant(req.user!.tenantId);

        if (!prompt) {
            res.status(404).json({ error: "Prompt não encontrado para essa empresa!" });
        }

        res.status(200).json(prompt);
    } catch(err:any){
        res.status(500).json({error: err.message});
    }
}