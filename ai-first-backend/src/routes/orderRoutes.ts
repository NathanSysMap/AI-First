import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createOrderHandler, getOrdersByTenantHandler, updateOrderStatusHandler, getOrdersByCustomerHandler } from "../controllers/orderController.js";

const orderRouter =  Router();

orderRouter.post("/", createOrderHandler);
orderRouter.get("/customer/:cpf", getOrdersByCustomerHandler);

orderRouter.use(isAuthenticated);
orderRouter.get("/tenant", getOrdersByTenantHandler);
orderRouter.patch("/:id/status", updateOrderStatusHandler);

export default orderRouter;