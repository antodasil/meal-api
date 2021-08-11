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
    const method = propertyKey.toLowerCase();
    if (!HTTPMethods.includes(method)) {
      logger.error(
        "Route decorator: " + method + " is not an HTTP method allowed"
      );
      return;
    }
    const router: any = options.public ? publicRouter : privateRouter;
    router[method](options.path, target[method].bind(target));
  };
}
