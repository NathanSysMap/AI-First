import { MercadoPagoConfig } from "mercadopago";

const mercadoPagoClient = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_TOKEN!,
});

export default mercadoPagoClient;