import { OrderStatus, PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();


export async function createOrder(cartId:string, customerId:string, shippingCost: number, shippingMethod: string) {
    return await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({
            where: {id: cartId},
            include: {
                items: true,
            },
        });

        if(!cart) {
            throw new Error("Carrinho não encontrado!");
        }

        if(cart.status !== "ATIVO"){
            throw new Error("O carrinho não está mais ativo!");
        }

        let total = 0;

        const orderItems = await Promise.all(
            cart.items.map(async (i) => {
                const product = await tx.product.findUnique({
                    where: {id: i.productId},
                    select: { price: true, stock: true, imageUrl:true},
                });

                if(!product){
                    throw new Error(`Produto ${i.name} não encontrado!`);
                }

                if(product.stock < i.quantity) {
                    throw new Error(`Estoque insuficiente para o produto ${i.name}!`);
                }

                total += i.quantity * i.unitPrice;

                await tx.product.update({
                    where: {id: i.productId},
                    data: {stock: product.stock - i.quantity},
                });

                return {
                    productId: i.productId,
                    name: i.name,
                    imageUrl: product.imageUrl,
                    quantity: i.quantity,
                    unitPrice: i.unitPrice,
                };
            })
        );

        total += shippingCost;

        const order = await tx.order.create({
            data: {
                customerId,
                tenantId: cart.tenantId,
                total,
                shippingCost,
                shippingMethod,
                items: {
                    create: orderItems,
                },
            },
            include: {
                items: true,
            },
        });

        await tx.cart.update({
            where: {id: cartId},
            data: {
                status: "FINALIZADO",
                customerId,
            },
        });

        return order;
    });
}


export async function updateOrderStatus(id:string, newStatus: OrderStatus) {
    const updatedOrder = await  prisma.$transaction(async (tx) => {
        if(newStatus === "RECUSADO" || newStatus === "CANCELADO") {
            const items = await tx.orderItem.findMany({
                where: {orderId: id},
            });

            for (const item of items){
                await tx.product.update({
                    where: {id: item.productId},
                    data:{
                        stock: {
                            increment: item.quantity,
                        },
                    },
                });
            }
        }

        return await tx.order.update({
            where: {id},
            data: {status: newStatus},
        });
    });

    return updatedOrder;
}

export async function getOrdersByTenant(tenantId: string) {
    return await prisma.order.findMany({
        where: { tenantId },
        include: {
            customer: true,
            items: {
                include:{
                    product: {
                        select: {
                            name: true,
                            imageUrl: true,
                        },
                    },
                },
            },
        },
    });
}

export async function getOrdersByCustomer(cpf:string) {
    return await prisma.order.findMany({
        where: {
            customer: {
                cpf,
            },
        },
        include: {
            customer: true,
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}