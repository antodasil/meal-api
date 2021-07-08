import * as core from 'express-serve-static-core';
import { BaseController } from './BaseController';

class HelloController extends BaseController {
    get(req: core.Request, res: core.Response) {
        res.json({'hello': 'world'});
    }
}

export const controller = new HelloController();