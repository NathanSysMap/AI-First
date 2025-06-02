import { Router } from "express";
import { createCustomerHandler, getCustomerByCPFHandler } from "../controllers/customerController";

const customerRouter = Router();

customerRouter.post("/", createCustomerHandler);
customerRouter.get("/:cpf", getCustomerByCPFHandler);

export default customerRouter;