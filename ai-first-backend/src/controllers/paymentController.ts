import { Request, Response } from "express";
import { generatePaymentLink } from "../services/paymentService";

export async function generatePaymentLinkHandler(req: Request, res: Response) {
    try {
        const { orderId } = req.body;
        const paymentUrl = await generatePaymentLink(orderId);
        res.status(200).json({ paymentUrl });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}