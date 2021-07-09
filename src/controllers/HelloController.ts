import { Request, Response } from 'express-serve-static-core';
import { BaseController } from './BaseController';

class HelloController extends BaseController {
    get(req: Request, res: Response) {
        res.json({'hello': 'world'});
    }
}

export const controller = new HelloController();