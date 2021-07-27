import { Router } from "express";
import Logger from "../logger/init-logger";

export const publicRouter = Router();
export const privateRouter = Router();

privateRouter.use(PrivateMiddleware);

const HTTPMethods = ["get", "post", "put", "patch", "delete"];

interface RouteOptions {
  path: string;
  public?: boolean;
}

export default function Route(options: RouteOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (!HTTPMethods.includes(propertyKey)) {
      Logger.error(
        "Route decorator: " + propertyKey + " is not an HTTP method allowed"
      );
      return;
    }
    const router: any = options.public ? publicRouter : privateRouter;
    router[propertyKey](options.path, target[propertyKey].bind(target));
  };
}

function PrivateMiddleware() {
  Logger.info("Private middleware");
}
