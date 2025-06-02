import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function register(email: string, password: string, name: string, companyId?: string) {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
        throw new Error('Usuário já existe!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let safeCompanyId: string | null = null;

    if (companyId && companyId.trim() !== '') {
        const company = await prisma.company.findUnique({ where: { id: companyId } });
        if (!company) throw new Error('Empresa não encontrada!');
        safeCompanyId = company.id;
    }

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            tenantId: safeCompanyId ?? 'default-tenant',
            companyId: safeCompanyId
        }
    });

    return user;
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email }, include: {company: true} });
    if (!user) {
        throw new Error('Usuário não encontrado!');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Senha inválida!');
    }

    const token = jwt.sign({ userId: user.id, tenantId: user.tenantId, companyId: user.companyId }, JWT_SECRET, { expiresIn: "7d" });

    return { token, user };
}

export async function updateUser(userId: string, data: any) {
    const existing = await prisma.user.findUnique({ where: { id: userId } });

    if(!existing){
        throw new Error("Usuário não encontrado!");
    }

    return await prisma.user.update({
        where: { id: userId },
        data
    });

}

export async function resolveTenantByWhatsApp(whatsapp: string){
    const contact = await prisma.companyContact.findFirst({
        where: {
            whatsapp,
        },
        include: {
            company: true,
        },
    });

    if(!contact || !contact.company){
        throw new Error("Não foi encontrada nenhuma empresa que possua este número de WhatsApp");
    }

    return {
        tenantId: contact.company.id,
        companyName: contact.company.corporateName,
    }
}