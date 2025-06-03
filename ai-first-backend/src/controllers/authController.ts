import { Request, Response } from "express";
import { userRequest } from "../types/express";
import { register, login, updateUser, resolveTenantByWhatsApp } from "../services/authService.js";
import { uploadImage } from "../services/uploadService.js";

export async function registerUserHandler(req:Request, res:Response) {
    const {email, password, name, companyId} = req.body;

    try{
        const user = await register(email, password, name, companyId);
        res.status(201).json({message: "Usuário criado com sucesso!", user});
        return;
    } catch(err: any){
        res.status(400).json({error: err.message});
        return;
    }
}

export async function loginUserHandler(req:Request, res:Response) {
    const {email, password} = req.body;

    try{
        const result = await login(email, password);
        res.status(200).json(result);
        return;
    } catch(err: any){
        res.status(400).json({error: err.message});
        return;
    }
}

export async function updateUserHandler(req:userRequest, res:Response) {
    try{
        const updatedUser = await updateUser(req.user!.id, req.body);
        res.status(200).json(updatedUser);
    } catch(err: any){
        res.status(400).json({error: err.message});
    }
}

export async function resolveTenantHandler(req:Request, res:Response) {
    const whatsapp = req.query.whatsapp as string;

    if(!whatsapp){
        res.status(400).json({error: "Campo WhatsApp não encontrado!"});
    }

    try{
        const result = await resolveTenantByWhatsApp(whatsapp);
        res.status(200).json(result);
    } catch(err: any){
        res.status(404).json({error: err.message});
    }
}

export async function uploadProfileImageHandler(req:Request, res:Response) {
    try{
        if(!req.file){
            res.status(400).json({error: "Arquivo não enviado"});
        }
        const imageUrl = await uploadImage(req.file!, "profile-images");
        res.status(200).json({imageUrl});
    } catch(err: any){
        res.status(400).json({error: err.message});
    }
}