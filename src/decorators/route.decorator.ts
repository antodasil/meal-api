import { logger } from "../utils";
import { publicRouter, privateRouter } from "../router";

const HTTPMethods = ["get", "post", "put", "patch", "delete"];

interface RouteOptions {
  path: string;
  public?: boolean;
}

// Route decorator
export function Route(options: RouteOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (!HTTPMethods.includes(propertyKey)) {
      logger.error(
        "Route decorator: " + propertyKey + " is not an HTTP method allowed"
      );
      return;
    }
    const router: any = options.public ? publicRouter : privateRouter;
    router[propertyKey](options.path, target[propertyKey].bind(target));
  };
}
