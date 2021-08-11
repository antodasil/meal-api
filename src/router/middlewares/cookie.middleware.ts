import { Request, Response } from "express-serve-static-core";

// Cookie transform middleware
export function CookieMiddleware(
  request: Request,
  response: Response,
  next: any
) {
  const cookiesString = request.headers.cookie;
  request.cookies = {};
  if (cookiesString) {
    request.cookies = cookiesString.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {});
  }
  next();
}
