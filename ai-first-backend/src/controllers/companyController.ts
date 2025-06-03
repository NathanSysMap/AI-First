import { Request, Response } from "express";
import { createCompany, getCompany, getCompanyUsers, updateCompany } from "../services/companyService.js";
import { userRequest } from "../types/express";
import { error } from "console";

export async function createCompanyHandler(req:Request, res:Response) {
    try{
        const company = await createCompany(req.body);
        res.status(201).json({message: "Empresa criada com sucesso!", company});
    }catch(err: any){
        console.error(err);
        res.status(400).json({error: err.message || "Falha na criação de uma nova empresa!"});
    }
}

export async function getCompanyHandler(req:userRequest, res: Response) {
    const tenantId = req.user!.tenantId;
    try {
        const company = await getCompany(tenantId);
        res.status(200).json(company);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
}

export async function updateCompanyHandler(req:userRequest, res:Response) {
    const tenantId = req.user!.tenantId;
    try {
        const updatedCompany = await updateCompany(tenantId, req.body);
        res.status(201).json(updatedCompany);
    } catch (err: any) {
        res.status(404).json({error: err.message});
    }
}

export async function getCompanyUsersHandler(req: userRequest, res:Response) {
    const tenantId = req.user!.tenantId;
    try {
        const companyUsers = await getCompanyUsers(tenantId);
        res.status(200).json(companyUsers);
    } catch(err: any) {
        res.status(400).json({error: err.message});
    }
}