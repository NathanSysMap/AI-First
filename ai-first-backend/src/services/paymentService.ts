import { title } from "process";
import mercadoPagoClient from "../utils/mercadoPagoClient.js";
import { Preference } from "mercadopago";
import { PrismaClient } from "@prisma/client";
import { response } from "express";

const prisma = new PrismaClient();

export async function generatePaymentLink(orderId: string) {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true, customer: true }
    });

    if (!order) {
        throw new Error("Pedido não encontrado!");
    }

    const preferenceClient = new Preference(mercadoPagoClient);

    const res = await preferenceClient.create({
        body: {
            items: [{
                id: order.id,
                title: `Pedido ${order.id}`,
                quantity: 1,
                currency_id: "BRL",
                unit_price: Number(order.total),
            }],
            payer: {
                name: order.customer.name,
                email: order.customer.email ?? undefined,
            },
            external_reference: order.id,
            notification_url: `${process.env.BASE_URL}/webhooks/mercado-pago`,
            back_urls: {
                success: `${process.env.FRONT_URL}/success`,
                failure: `${process.env.FRONT_URL}/failure`,
            },
            auto_return: "approved"
        }
    });

    return res.init_point;


}
