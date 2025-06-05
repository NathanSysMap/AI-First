import { Router } from "express";
import { listPublicProductsHandler, uploadProductImageHandler, createProductHandler, listProductsHandler, getProductHandler, updateProductHandler, deleteProductHandler, generateProductTemplateHandler, importProductsHandler } from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const productRouter = Router();

productRouter.get("/template", generateProductTemplateHandler);
productRouter.get("/public/:tenantId", listPublicProductsHandler);


productRouter.use(isAuthenticated);

productRouter.post("/", createProductHandler);
productRouter.get("/", listProductsHandler);
productRouter.get("/:id", getProductHandler);
productRouter.put("/:id", updateProductHandler);
productRouter.delete("/:id", deleteProductHandler);
productRouter.post("/upload-image", isAuthenticated, upload.single("image"), uploadProductImageHandler);
productRouter.post('/import', upload.single('file'), importProductsHandler);

export default productRouter;

