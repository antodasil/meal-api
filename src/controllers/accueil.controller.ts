import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import Route from "../decorators/route.decorator";
// import Logger from 'logger';

class AccueilController extends BaseController {
  @Route({
    path: "/",
    method: "get",
    public: true,
  })
  get(req: Request, res: Response) {
    // Logger.debug('Debug log');
    res.json({ accueil: "ok" });
  }
}

export const Accueil = new AccueilController();
