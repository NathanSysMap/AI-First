import { Request, Response, RequestHandler } from "express";
import { createProduct, getProductById, getProductByTenant, updateProduct, deleteProduct, generateProductTemplate, importProducts } from "../services/productService.js";
import { uploadImage } from "../services/uploadService.js";
import { error } from "console";
import { userRequest } from "../types/express/index.js";


export async function createProductHandler(req: Request, res: Response) {
    try {
        const { id: userId, tenantId } = (req as any).user;
        const product = await createProduct(req.body, userId, tenantId);
        res.status(201).json(product);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function listProductsHandler(req: Request, res: Response) {
    try {
        const { tenantId } = (req as any).user;
        const products = await getProductByTenant(tenantId);
        res.status(200).json(products);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export async function listPublicProductsHandler(req: Request, res: Response) {
    const tenantId = req.params.tenantId;

    try {
        const products = await getProductByTenant(tenantId);
        res.status(200).json(products);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export async function getProductHandler(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const product = await getProductById(id);
        if (!product) {
            res.status(404).json({ error: "Produto não encontrado!" });
        }
        res.status(200).json(product);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateProductHandler(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const userId = (req as any).user?.id;

        const product = await updateProduct(id, req.body, userId);
        if (!product) {
            res.status(404).json({ error: "Produto não encontrado!" });
        }
        res.status(200).json(product);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteProductHandler(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const userId = (req as any).user?.id;

        const product = await deleteProduct(id, userId);
        if (!product) {
           res.status(404).json({ error: "Produto não encontrado!" });
        }
        res.status(204).end();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}


export async function uploadProductImageHandler(req: Request, res: Response) {
    try {
        if (!req.file) {
            res.status(400).json({ error: "Arquivo não enviado" });
        }
        const imageUrl = await uploadImage(req.file!, "product-images");
        res.status(200).json({ imageUrl });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export function generateProductTemplateHandler(req: Request, res: Response) {
    try {
        const buffer = generateProductTemplate();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.attachment('modelo_produtos.xlsx');

        res.send(buffer);
    } catch(err:any) {
        console.error('Erro ao gerar planilha: ', err);
        res.status(500).json({error: 'Erro ao gerar a planilha.'});
    }
}

export async function importProductsHandler(req: userRequest, res: Response) {
    const file = req.file;
    const tenantId = req.user!.tenantId;
    const userId = req.user!.id;

    if (!file) {
        res.status(400).json({ error: 'Arquivo não anexado!' });
    }

    try {
        const result = await importProducts(file!.buffer, file!.originalname, tenantId, userId);
        res.json({ message: 'Importação realizada com sucesso! ', result });
    } catch (err: any) {
        res.status(500).json({ error: 'Falha na importação! ', detail: err.message });
    }
}


