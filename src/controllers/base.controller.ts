import { Request, Response } from 'express-serve-static-core';

export class BaseController {
    get(req: Request, res: Response) {
        throw new Error('Get method not implemented yet');
    }

    post(req: Request, res: Response) {
        throw new Error('Post method not implemented yet');
    }

    put(req: Request, res: Response) {
        throw new Error('Put method not implemented yet');
    }

    patch(req: Request, res: Response) {
        throw new Error('Patch method not implemented yet');
    }

    delete(req: Request, res: Response) {
        throw new Error('Delete method not implemented yet');
    }
}