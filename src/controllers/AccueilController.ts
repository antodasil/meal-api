import * as core from 'express-serve-static-core';
import { BaseController } from './BaseController';

class AccueilController extends BaseController {
    get(req: core.Request, res: core.Response) {
        res.json({'accueil': 'ok'});
    }
}

export const controller = new AccueilController();