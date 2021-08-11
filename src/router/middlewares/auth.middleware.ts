import { Request, Response } from "express-serve-static-core";
import { BaseController } from "../../controllers/base.controller";
import { verifyToken, logger } from "../../utils";

// Auth middleware
export function AuthMiddleware(
  request: Request,
  response: Response,
  next: any
) {
  const token = request.cookies?.token;
  if (!token) {
    response.sendStatus(BaseController.STATUS_UNAUTHORIZED);
    return;
  }

  try {
    response.locals.tokenPayload = verifyToken(token);
  } catch (e) {
    logger.error("Unverified token: " + token + "\n" + e);
    response.sendStatus(BaseController.STATUS_UNAUTHORIZED);
    return;
  }

  next();
}
