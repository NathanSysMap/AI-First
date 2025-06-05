import { PrismaClient, ProductType } from "@prisma/client";
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export async function createProduct(data: any, userId: string, tenantId: string) {
    const product = await prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            unit: data.unit,
            weight: data.weight,
            height: data.height,
            width: data.width,
            length: data.length,
            category: data.category,
            subcategory: data.subcategory,
            imageUrl: data.imageUrl,
            stock: data.stock,
            active: data.active ?? true,
            productType: data.productType as ProductType,
            tags: data.tags,
            userId,
            tenantId
        }
    });

    await createProductHistory(product, "CREATE", userId);

    return product;
}

export async function getProductByTenant(tenantId: string) {
    return await prisma.product.findMany({
        where: {
            tenantId,
            active: true,
        }
    });
}

export async function getProductById(id: string) {
    return await prisma.product.findUnique({ where: { id } });
}

export async function updateProduct(id: string, data: any, userId: string) {
    const existing = await prisma.product.findUnique({ where: { id } });

    await createProductHistory(existing, "UPDATE", userId);

    const updated = await prisma.product.update({
        where: { id },
        data
    });

    return updated;
}

export async function deleteProduct(id: string, userId: string) {
    const existing = await prisma.product.findUnique({ where: { id } });

    await createProductHistory(existing, "DELETE", userId);

    const updated = await prisma.product.update({
        where: { id },
        data: {
            active: false,
        }
    });

    return updated;
}

export async function createProductHistory(productData: any, action: "CREATE" | "UPDATE" | "DELETE", changedBy: string) {
    await prisma.productHistory.create({
        data: {
            productId: productData.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            weight: productData.weight,
            height: productData.height,
            width: productData.width,
            length: productData.length,
            unit: productData.unit,
            category: productData.category,
            subcategory: productData.subcategory,
            imageUrl: productData.imageUrl,
            stock: productData.stock,
            active: productData.active ?? true,
            productType: productData.productType,
            tags: productData.tags,
            action,
            changedBy
        },
    });
}

export function generateProductTemplate(): Buffer {
    const headers = [{
        name: 'Ex: Calça de Moletom',
        description: 'Ex: Calça de moletom básica na cor preta',
        price: 90.0,
        unit: '40',
        weight: 0.2,
        height: 2,
        width: 30,
        length: 20,
        category: 'Calça',
        subcategory: 'Masculina',
        imageUrl: 'https://exemplo.com/imagem.jpg',
        stock: 50,
        active: true,
        ProductType: 'PRODUTO',
        tags: 'algodão,elastano'
    }];

    const worksheet = XLSX.utils.json_to_sheet(headers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos');

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

export async function importProducts(fileBuffer: Buffer, fileName: string, tenantId: string, userId: string) {
    let rows: any[] = [];

    if (fileName.endsWith('.xlsx')) {
        const workbook = XLSX.read(fileBuffer);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet);
    } else if (fileName.endsWith('.csv')) {
        rows = parse(fileBuffer, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });
    } else {
        throw new Error('Formato de arquivo não suportado! Envie um document .csv ou .xlsx');
    }

    const results: { name: string; status: string; error?: string }[] = [];

    for (const row of rows) {
        try {
            await prisma.product.create({
                data: {
                    name: row.name,
                    description: row.description,
                    price: parseFloat(row.price),
                    unit: row.unit,
                    weight: parseFloat(row.weight),
                    height: parseFloat(row.height),
                    width: parseFloat(row.width),
                    length: parseFloat(row.length),
                    category: row.category,
                    subcategory: row.subcategory,
                    imageUrl: row.imageUrl,
                    stock: parseInt(row.stock),
                    active: row.active ?? true,
                    productType: row.productType as ProductType,
                    tags: typeof row.tags === 'string' ? row.tags.split(',').map((t: string) => t.trim()):[],
                    userId,
                    tenantId
                }
            });

            results.push({ name: row.name, status: 'importado'});
        } catch(err: any) {
            results.push({ name: row.name, status: 'erro', error: err.message});
        }
    }
    return results;
}