import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCustomer(data: any) {
    const existing = await prisma.customer.findUnique({
        where: { cpf: data.cpf },
    });

    if (existing) {
        throw new Error("Cliente já existente!");
    }

    const customer = await prisma.customer.create({
        data: {
            name: data.name,
            cpf: data.cpf,
            phone: data.phone,
            email: data.email,
            addresses: {
                create: {
                    street: data.addresses.street,
                    number: data.addresses.number,
                    city: data.addresses.city,
                    state: data.addresses.state,
                    zipCode: data.addresses.zipCode,
                },
            },
        },
        include: {
            addresses: true
        },
    });

    return customer;
}

export async function getCustomerByCPF(cpf: string) {
    const customer = await prisma.customer.findUnique({
        where: { cpf },
        include: {
            addresses: true,
        }
    });

    if (!customer) {
        throw new Error("Cliente não encontrado!");
    }

    return customer;
}