import { Router } from "express";
import { listPublicProductsHandler, uploadProductImageHandler, createProductHandler, listProductsHandler, getProductHandler, updateProductHandler, deleteProductHandler } from "../controllers/productController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const productRouter = Router();

productRouter.get("/public/:tenantId", listPublicProductsHandler);

productRouter.use(isAuthenticated);

productRouter.post("/", createProductHandler);
productRouter.get("/", listProductsHandler);
productRouter.get("/:id", getProductHandler);
productRouter.put("/:id", updateProductHandler);
productRouter.delete("/:id", deleteProductHandler);
productRouter.post("/upload-image", isAuthenticated, upload.single("image"), uploadProductImageHandler);

export default productRouter;

