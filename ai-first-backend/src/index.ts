import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';
import companyRouter from "./routes/companyRoutes";
import productRouter from "./routes/productRoutes";
import orderRouter from "./routes/orderRoutes";
import customerRouter from "./routes/customerRoutes";
import agentRouter from "./routes/agentRoutes";
import cartRouter from "./routes/cartRoutes";
import paymentRouter from "./routes/paymentRoutes";
import mercadoPagoClient from "./utils/mercadoPagoClient";
import { mercadoPagoWebhook } from "./webhooks/mercadoPagoWebhook";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/companies', companyRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/customers', customerRouter);
app.use('/agent', agentRouter);
app.use('/cart', cartRouter);
app.use('/payments', paymentRouter);
app.post('/webhooks/mercado-pago', express.json(), mercadoPagoWebhook);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));