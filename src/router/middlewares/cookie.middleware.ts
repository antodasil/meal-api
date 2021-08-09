import { Request, Response } from "express-serve-static-core";

// Cookie transform middleware
export function CookieMiddleware(
  request: Request,
  response: Response,
  next: any
) {
  const cookiesString = request.headers.cookie;
  response.locals.cookie = {};
  if (cookiesString) {
    response.locals.cookie = cookiesString.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {});
  }
  next();
}
