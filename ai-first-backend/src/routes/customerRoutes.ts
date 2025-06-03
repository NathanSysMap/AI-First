import { Router } from "express";
import { createCustomerHandler, getCustomerByCPFHandler } from "../controllers/customerController.js";

const customerRouter = Router();

customerRouter.post("/", createCustomerHandler);
customerRouter.get("/:cpf", getCustomerByCPFHandler);

export default customerRouter;