import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function upsertCart(
    tenantId: string,
    customerPhone: string,
    items: { productId: string; quantity: number }[]
) {
    const existingCart = await prisma.cart.findFirst({
        where: {
            tenantId,
            customerPhone,
            status: "ATIVO",
        },
        include: { items: true },
    });

    const products = await prisma.product.findMany({
        where: { id: { in: items.map((i) => i.productId) } },
    });

    if (products.length !== items.length) {
        const foundIds = products.map((p) => p.id);
        const notFound = items.filter((i) => !foundIds.includes(i.productId));
        throw new Error(`Produtos não encontrados: ${ notFound.map((i) => i.productId).join(", ") }`);
    }

    if (existingCart) {
        for (const item of items) {
            const product = products.find((p) => p.id === item.productId)!;
            const existingItem = existingCart.items.find(
                (i) => i.productId === item.productId
            );

            if (existingItem) {
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + item.quantity },
                });
            } else {
                await prisma.cartItem.create({
                    data: {
                        cartId: existingCart.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        name: product.name,
                        unitPrice: product.price,
                    },
                });
            }
        }

        return await prisma.cart.findUnique({
            where: { id: existingCart.id },
            include: { items: true },
        });
    }


    const cart = await prisma.cart.create({
        data: {
            tenantId,
            customerPhone,
            status: "ATIVO",
            items: {
                create: items.map((item) => {
                    const product = products.find((p) => p.id === item.productId)!;
                    return {
                        productId: item.productId,
                        quantity: item.quantity,
                        name: product.name,
                        unitPrice: product.price,
                    };
                }),
            },
        },
        include: { items: true },
    });

    return cart;
}

export async function removeItemFromCart(cartId: string, productId: string) {
    const cartItem = await prisma.cartItem.findFirst({
        where: { cartId, productId },
    });

    if (!cartItem) {
        throw new Error("Item não encontrado!");
    }

    await prisma.cartItem.delete({
        where: { id: cartItem.id },
    });

    return { message: "Item removido do carrinho." };
}

export async function getCart(tenantId: string, customerPhone: string) {
    const cart = await prisma.cart.findFirst({
        where: {
            tenantId,
            customerPhone,
            status: "ATIVO",
        },
        include: { items: true },
    });

    if (!cart) {
        throw new Error("Carrinho não encontrado!");
    }

    const total = cart.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

    return cart;
}

export async function getCartDimensions(cartId: string) {
    console.log("id recebido: ", cartId);
    const dimensionsCart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    console.log("Carrinho encontrado: ", dimensionsCart);

    if (!dimensionsCart) {
        throw new Error("Carrinho não encontrado!");
    }

    let totalWeight = 0;
    let totalVolume = 0;

    for(const i of dimensionsCart.items){
        const {weight, height, width, length} = i.product;

        if(!height || !width || !length || !weight){
            throw new Error(`Produto ${i.productId} não possui todas as dimensões cadastradas!`);
        }

        const itemVolume = height * width * length;
        totalWeight += weight * i.quantity;
        totalVolume += itemVolume * i.quantity;
    }

    const cubicRoot = Math.cbrt(totalVolume);
    const cartHeight = Math.max(2, Math.ceil(cubicRoot));
    const cartWidth = Math.max(11, Math.ceil(cubicRoot));
    const cartLength = Math.max(16, Math.ceil(cubicRoot));
    
    console.log(totalWeight, cartHeight, cartWidth, cartLength);

    return {
        totalWeight: Number(totalWeight.toFixed(2)),
        cartHeight,
        cartWidth,
        cartLength,
    };

    
}

const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN as string;

export async function calcShippingCart(cartId: string, destinyZipCode: string) {
    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { items: true },
    });

    if (!cart) {
        throw new Error("Carrinho não encontrado!");
    }

    const originZipCode = await prisma.companyAddress.findFirst({
        where: { companyId: cart.tenantId },
        select: {
            zipCode: true,
        }
    });

    if (!originZipCode || !originZipCode.zipCode) {
        throw new Error("Endereço da empresa não encontrado ou sem CEP!");
    }

    const dimensions = await getCartDimensions(cartId);

    const params = {
        from: {
            postal_code: originZipCode.zipCode,
        },
        to: {
            postal_code: destinyZipCode,
        },
        package: {
            height: dimensions.cartHeight,
            width: dimensions.cartWidth,
            length: dimensions.cartLength,
            weight: dimensions.totalWeight,
        },
    };

    const response = await fetch('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${MELHOR_ENVIO_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': 'AIFIRST contato.nathanlima@hotmail.com'
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        console.error(errorResponse);
        throw new Error(`Erro na API do MelhorEnvio: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Nenhuma opção de frete encontrada!");
    }

    const shippingOptions = data.filter((option: any) => option.pice != null && option.delivery_time != null)
    .map((option: any) => ({
        shippingMethod: option.name.replace(/[\s.]/g, '').toUpperCase(),
        exhibitionName: `${option.company.name} - ${option.name}`,
        shippingPrice: Number(option.price),
        deliveryTime: Number(option.delivery_time),
        shippingCompany: option.company.name,
        service: option.name,
    }));

    return shippingOptions;
}