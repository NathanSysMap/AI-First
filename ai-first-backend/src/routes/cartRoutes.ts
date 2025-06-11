import { Router } from "express";
import { upsertCartHandler, getCartHandler, removeItemFromCartHandler, calcShippingCartHandler, deleteCarteHandler } from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post('/', upsertCartHandler);
cartRouter.get('/:tenantId/:customerPhone', getCartHandler);
cartRouter.delete('/:cartId/item/:productId', removeItemFromCartHandler);
cartRouter.post('/:cartId/shipping', calcShippingCartHandler);
cartRouter.delete('/delete-cart', deleteCarteHandler);

export default cartRouter;