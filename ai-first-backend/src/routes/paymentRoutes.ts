import { Router } from "express";
import { generatePaymentLinkHandler } from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.post('/generate-link', generatePaymentLinkHandler);

export default paymentRouter;