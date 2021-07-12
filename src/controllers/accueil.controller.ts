import { Request, Response } from 'express-serve-static-core';
import BaseController from 'base-controller';

class AccueilController extends BaseController {
    get(req: Request, res: Response) {
        res.json({'accueil': 'ok'});
    }
}

export const controller = new AccueilController();