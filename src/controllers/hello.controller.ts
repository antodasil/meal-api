import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import Route from "../decorators/route.decorator";

export class HelloController extends BaseController {
  @Route({
    path: "/hello",
    method: "get",
    public: true,
  })
  get(request: Request, response: Response) {
    response.json({ hello: "world" });
  }
}
