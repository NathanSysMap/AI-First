import { Router } from "express";
import { getPromptByTenantHandler, uploadAgentDocumentHandler, upsertPromptHandler } from "../controllers/agentController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const agentRouter = Router();

agentRouter.use(isAuthenticated);
agentRouter.post("/upload-document", upload.single("file"), uploadAgentDocumentHandler);
agentRouter.post("/prompt", upsertPromptHandler);
agentRouter.get("/agent-prompt", getPromptByTenantHandler);

export default agentRouter;


