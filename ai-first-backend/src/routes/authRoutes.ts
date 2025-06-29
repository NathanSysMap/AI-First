import { Router } from "express";
import { registerUserHandler, loginUserHandler, updateUserHandler, uploadProfileImageHandler, resolveTenantHandler } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const authRouter = Router();

authRouter.post('/register', registerUserHandler);
authRouter.post('/login', loginUserHandler);
authRouter.get('/public/resolve-tenant', resolveTenantHandler);

authRouter.use(isAuthenticated);
authRouter.patch('/update', updateUserHandler);
authRouter.post("/upload-image", upload.single("image"), uploadProfileImageHandler);

export default authRouter;