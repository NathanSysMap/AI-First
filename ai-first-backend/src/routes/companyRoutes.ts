import { Router } from "express";
import { createCompanyHandler, getCompanyHandler, getCompanyUsersHandler, updateCompanyHandler } from "../controllers/companyController";
import { isAuthenticated } from "../middlewares/authMiddleware";


const companyRouter = Router();

companyRouter.post("/", createCompanyHandler);

companyRouter.use(isAuthenticated);
companyRouter.get('/company', getCompanyHandler);
companyRouter.put('/company', updateCompanyHandler);
companyRouter.get('/company/users', getCompanyUsersHandler);

export default companyRouter;