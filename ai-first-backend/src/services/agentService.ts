import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function upsertPrompt(tenantId: string, systemPrompt: string) {
    const prompt = await prisma.agentPrompt.upsert({
        where: {tenantId},
        update: {systemPrompt},
        create: {tenantId, systemPrompt},
    });

    return prompt;
}

export async function getPromptByTenant(tenantId:string) {
    return prisma.agentPrompt.findUnique({
        where: {tenantId},
    });
}


