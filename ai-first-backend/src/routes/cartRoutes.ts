import { Router } from "express";
import { upsertCartHandler, getCartHandler, removeItemFromCartHandler, calcShippingCartHandler } from "../controllers/cartController";

const cartRouter = Router();

cartRouter.post('/', upsertCartHandler);
cartRouter.get('/:tenantId/:customerPhone', getCartHandler);
cartRouter.delete('/:cartId/item/:productId', removeItemFromCartHandler);
cartRouter.post('/:cartId/shipping', calcShippingCartHandler);

export default cartRouter;