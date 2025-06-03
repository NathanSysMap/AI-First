import { Request, Response, RequestHandler } from "express";
import { createProduct, getProductById, getProductByTenant, updateProduct, deleteProduct } from "../services/productService.js";
import { uploadImage } from "../services/uploadService.js";
import { error } from "console";


export async function createProductHandler(req: Request, res: Response) {
    try {
      const { id: userId, tenantId } = (req as any).user;
      const product = await createProduct(req.body, userId, tenantId);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
}

export async function listProductsHandler(req:Request, res:Response){
    try {
        const { tenantId } = (req as any).user;
        const products = await getProductByTenant(tenantId);
        res.status(200).json(products);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export async function listPublicProductsHandler(req:Request, res:Response){   
    const tenantId = req.params.tenantId;

    try {
        const products = await getProductByTenant(tenantId);
        res.status(200).json(products);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export async function getProductHandler(req:Request, res:Response) {
    try{
        const id = req.params.id as string;
        const product = await getProductById(id);
        if(!product){
            res.status(404).json({error: "Produto não encontrado!"});
        }
        res.status(200).json(product);
    }catch(err: any){
        res.status(500).json({error: err.message});
    }
}

export async function updateProductHandler(req:Request, res:Response) {
    try{
        const id = req.params.id as string;
        const userId = (req as any).user?.id;

        const product = await updateProduct(id, req.body, userId);
        if(!product){
            res.status(404).json({error: "Produto não encontrado!"});
        }
        res.status(200).json(product);
    }catch(err: any){
        res.status(400).json({error: err.message});
    }
}

export async function deleteProductHandler(req:Request, res:Response) {
    try{
        const id = req.params.id as string;
        const userId = (req as any).user?.id;

        const product = await deleteProduct(id, userId);
        if(!product){
            res.status(404).json({error: "Produto não encontrado!"});
        }
        res.status(204).end();
    }catch(err: any){
        res.status(400).json({error: err.message});
    }
}


export async function uploadProductImageHandler(req:Request, res:Response) {
    try{
        if(!req.file){
            res.status(400).json({error: "Arquivo não enviado"});
        }
        const imageUrl = await uploadImage(req.file!, "product-images");
        res.status(200).json({imageUrl});
    } catch(err: any){
        res.status(400).json({error: err.message});
    }
}


