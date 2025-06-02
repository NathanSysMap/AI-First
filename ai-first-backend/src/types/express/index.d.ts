import { Request } from "express"


export interface userRequest extends Request {
  user?: {
    id: string;
    tenantId: string;
    companyId?: string;
  };
}

