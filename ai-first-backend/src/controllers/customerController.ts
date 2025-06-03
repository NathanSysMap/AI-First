import { Request, Response } from "express";
import { createCustomer, getCustomerByCPF } from "../services/customerService.js";

export async function createCustomerHandler(req: Request, res: Response) {
    try {
        const customer = await createCustomer(req.body);
        res.status(201).json(customer);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }

}

export async function getCustomerByCPFHandler(req: Request, res: Response) {
    try {
        const { cpf } = req.params;
        const customer = await getCustomerByCPF(cpf);
        res.status(200).json(customer);
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
}