import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import companyRouter from "./routes/companyRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import agentRouter from "./routes/agentRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { mercadoPagoWebhook } from "./webhooks/mercadoPagoWebhook.js";
import { fileURLToPath } from "url";
import path from "path";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir o frontend buildado
app.use(express.static(path.join(__dirname, "../../ai-first-frontend/dist")));
app.get(/(.*)/, (_, res) =>
    res.sendFile(path.join(__dirname, "../../ai-first-frontend/dist/index.html"))
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
