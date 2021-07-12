import { Request, Response } from 'express-serve-static-core';
import BaseController from 'base-controller';

class HelloController extends BaseController {
    get(req: Request, res: Response) {
        res.json({'hello': 'world'});
    }
}

export const controller = new HelloController();