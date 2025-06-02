import { Router } from "express";
import { getPromptByTenantHandler, uploadAgentDocumentHandler, upsertPromptHandler } from "../controllers/agentController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const agentRouter = Router();

agentRouter.use(isAuthenticated);
agentRouter.post("/upload-document", upload.single("file"), uploadAgentDocumentHandler);
agentRouter.post("/prompt", upsertPromptHandler);
agentRouter.get("/agent-prompt", getPromptByTenantHandler);

export default agentRouter;


