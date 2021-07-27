import { Router } from "express";

export const publicRouter = Router();
export const privateRouter = Router();

privateRouter.use(PrivateMiddleware);

type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";

interface RouteOptions {
  path: string;
  method: HTTPMethod;
  public?: boolean;
}

export default function Route(options: RouteOptions) {
  return (target: any, propertykey: string, descriptor: PropertyDescriptor) => {
    const router = options.public ? publicRouter : privateRouter;
    router[options.method](options.path, target[propertykey].bind(target));
  };
}

function PrivateMiddleware() {
  console.log("Private middleware");
}
