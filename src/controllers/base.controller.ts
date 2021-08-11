import { Request, Response } from "express-serve-static-core";

export class BaseController {
  // Success
  public static readonly STATUS_SUCCESS = 200; // Get, Update success
  public static readonly STATUS_CREATED = 201; // Post success
  public static readonly STATUS_NO_CONTENT = 204; // Delete success

  // Request error
  public static readonly STATUS_BAD_REQUEST = 400; // Bad request (A parameter missing ...)
  public static readonly STATUS_UNAUTHORIZED = 401; // Not identified
  public static readonly STATUS_FORBIDDEN = 403; // No rights
  public static readonly STATUS_NOT_FOUND = 404;
  public static readonly STATUS_NOT_ALLOWED = 405;

  get(req: Request, res: Response) {
    throw new Error("Get method not implemented yet");
  }

  post(req: Request, res: Response) {
    throw new Error("Post method not implemented yet");
  }

  put(req: Request, res: Response) {
    throw new Error("Put method not implemented yet");
  }

  patch(req: Request, res: Response) {
    throw new Error("Patch method not implemented yet");
  }

  delete(req: Request, res: Response) {
    throw new Error("Delete method not implemented yet");
  }
}
