import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { Route } from "../decorators";

export class AccueilController extends BaseController {
  @Route({
    path: "/",
    public: true,
  })
  get(request: Request, response: Response) {
    response.json({ accueil: "ok" });
  }
}

export const Accueil = new AccueilController();
