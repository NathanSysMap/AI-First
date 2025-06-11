import { error } from "console";
import { upsertCart, getCart, removeItemFromCart, calcShippingCart, getCartDimensions, deleteCart } from "../services/cartService.js";
import { Request, Response } from "express";

export async function upsertCartHandler(req:Request, res:Response) {
    const {tenantId, customerPhone, items} = req.body;

    try{
        const cart = await upsertCart(tenantId, customerPhone, items);
        res.status(200).json(cart);
    } catch(err: any){
        res.status(500).json({error: err.message});
    }
};

export async function getCartHandler(req:Request, res:Response) {
    const {tenantId, customerPhone} = req.params;

    try{
        const clientCart = await getCart(tenantId, customerPhone);
        res.status(200).json(clientCart);
    } catch(err: any){
        res.status(404).json({error: err.message});
    }
};

export async function removeItemFromCartHandler(req:Request, res:Response) {
    const {cartId, productId} = req.params;

    try{
        const result = await removeItemFromCart(cartId, productId);
        res.status(200).json(result);
    } catch(err: any){
        res.status(404).json({error: err.message});
    }
};

export async function calcShippingCartHandler(req:Request, res:Response) {
    const {cartId} = req.params;
    const {destinyZipCode} = req.body;

    try{
        const shippingOptions = await calcShippingCart(cartId, destinyZipCode);
        res.status(200).json(shippingOptions);
    } catch(err: any){
        res.status(500).json({error: err.message});
    }
};

export async function deleteCarteHandler(req:Request, res:Response) {
    const {tenantId, customerPhone} = req.params;

    try{
        const deleteResult = await deleteCart(tenantId, customerPhone);
        res.status(200).json(deleteResult);
    } catch(err: any){
        res.status(500).json({error: err.message});
    }
}

