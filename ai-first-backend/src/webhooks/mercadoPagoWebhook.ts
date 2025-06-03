import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import mercadoPagoClient from "../utils/mercadoPagoClient.js";
import { Payment } from "mercadopago";

const prisma = new PrismaClient();

export async function mercadoPagoWebhook(req:Request, res: Response) {
    try {
        const paymentId = req.body.data?.id;

        if(!paymentId) {
            res.sendStatus(400);
        }

        const paymentClient = new Payment(mercadoPagoClient);

        const payment = await paymentClient.get({id: paymentId});

        const status = payment.status;
        const orderId = payment.external_reference;

        if(status ===  "approved"){
            await prisma.order.update({
                where: {id: orderId},
                data: {status: "ACEITO"},
            });
        }

        res.sendStatus(200);
    } catch (err: any) {
        console.error("Erro no webhook: ", err);
        res.sendStatus(500);
    }
}