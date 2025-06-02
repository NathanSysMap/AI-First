import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProduct(data:any, userId:string, tenantId:string) {
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

export async function getProductByTenant(tenantId:string) {
    return await prisma.product.findMany({
        where: {
            tenantId,
            active: true,
        }
    });
}

export async function getProductById(id:string) {
    return await prisma.product.findUnique({where: {id}});
}

export async function updateProduct(id:string, data:any, userId:string) {
    const existing = await prisma.product.findUnique({where: {id}});

    await createProductHistory(existing, "UPDATE", userId);

    const updated = await prisma.product.update({
        where: {id},
        data
    });

    return updated;
}

export async function deleteProduct(id:string, userId:string) {
    const existing = await prisma.product.findUnique({where: {id}});

    await createProductHistory(existing, "DELETE", userId);

    const updated = await prisma.product.update({
        where: {id},
        data: {
            active: false,
        }
    });

    return updated;
}

export async function createProductHistory(productData:any, action:"CREATE" | "UPDATE" | "DELETE", changedBy:string) {
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