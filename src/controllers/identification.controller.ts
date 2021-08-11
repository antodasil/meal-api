import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { UserDAO } from "../model/dao";
import { Route } from "../decorators";
import { generateToken, isDevelopmentEnv } from "../utils";

export class IdentificationController extends BaseController {
  @Route({
    path: "/identification",
    public: true,
  })
  /** get a JWToken for the user */
  async post(request: Request, response: Response) {
    if (!request.body.pseudo || !request.body.password) {
      response.sendStatus(BaseController.STATUS_BAD_REQUEST);
      return;
    }

    const user = await UserDAO.getInstance().exist(
      request.body.pseudo as string,
      request.body.password as string
    );

    if (!user) {
      response.sendStatus(BaseController.STATUS_BAD_REQUEST);
      return;
    }

    response
      .cookie("token", await generateToken(user), {
        httpOnly: true,
        secure: isDevelopmentEnv() ? false : true,
      })
      .sendStatus(BaseController.STATUS_CREATED);
  }
}
