import express, { Router } from "express";
import { AuthMiddleware, CookieMiddleware } from "./middlewares";

// Public routes
export const publicRouter = Router();
publicRouter.use(CookieMiddleware);

// Private routes
export const privateRouter = Router();
privateRouter.use(AuthMiddleware);

// Default router
const defaultRouter = Router();
defaultRouter.use(express.json());
defaultRouter.use(express.urlencoded({ extended: true }));
defaultRouter.use(CookieMiddleware);
defaultRouter.use("/private", privateRouter);
defaultRouter.use("/public", publicRouter);

export default defaultRouter;
