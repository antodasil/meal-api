import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { Route } from "../decorators";

export class HelloController extends BaseController {
  @Route({
    path: "/hello",
    public: true,
  })
  get(request: Request, response: Response) {
    response.json({ hello: "world" });
  }
}
