import * as core from 'express-serve-static-core';

export class BaseController {
    get(req: core.Request, res: core.Response) {
        throw new Error('Get method not implemented yet');
    }

    post(req: core.Request, res: core.Response) {
        throw new Error('Post method not implemented yet');
    }

    put(req: core.Request, res: core.Response) {
        throw new Error('Put method not implemented yet');
    }

    patch(req: core.Request, res: core.Response) {
        throw new Error('Patch method not implemented yet');
    }

    delete(req: core.Request, res: core.Response) {
        throw new Error('Delete method not implemented yet');
    }
}