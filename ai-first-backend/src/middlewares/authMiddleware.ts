import { error } from "console";
import { Response, Request, NextFunction, RequestHandler } from "express";
import { userRequest } from "../types/express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function isAuthenticated(req:userRequest, res:Response, next:NextFunction) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      res.status(401).json({ error: "Token inexistente!" });
      return;
    }
  
    const [, token] = authHeader.split(" ");
    if (!token) {
      res.status(401).json({ error: "Token inválido!" });
      return;
    }
  
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      req.user = {
        id: payload.userId,
        tenantId: payload.tenantId,
        companyId: payload.companyId,
      };
      return next();
    } catch (err) {
      res.status(401).json({ error: "Token inválido ou expirado!" });
      return;
    }
  };