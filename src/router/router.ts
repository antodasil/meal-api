import { Router } from "express";
import { CookieMiddleware } from "./middlewares";

// Public routes
export const publicRouter = Router();
publicRouter.use(CookieMiddleware);

// private routes
export const privateRouter = Router();
privateRouter.use(CookieMiddleware);
