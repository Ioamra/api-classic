import { Request, Response, NextFunction } from 'express';
import { MiddlewareFunction } from './middlewareClass.middleware';

export class Middleware {
    // API
    static requireAuthentication(req: Request, res: Response, next: NextFunction){
        MiddlewareFunction.checkConnectApi(req, res, next);
    }
}