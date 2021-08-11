import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { UserDAO } from "../model/dao";
import { Route } from "../decorators";

export class UserController extends BaseController {
  // GET METHOD
  @Route({
    path: "/user/:id",
  })
  async get(request: Request, response: Response) {
    if (!request.params.id) {
      response.sendStatus(BaseController.STATUS_BAD_REQUEST);
      return;
    }

    let dao = UserDAO.getInstance();
    let user = await dao.select(request.params.id);

    response.status(BaseController.STATUS_SUCCESS).json(user);
  }

  // POST METHOD
  @Route({
    path: "/user",
  })
  async post(request: Request, response: Response) {
    let dao = UserDAO.getInstance();
    let user: any = request.query;
    let userId = await dao.insert(user.pseudo, user.mail, user.password);

    response.status(BaseController.STATUS_CREATED).json({
      userId,
    });
  }
}
