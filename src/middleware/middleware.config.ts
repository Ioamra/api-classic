import { Request, Response, NextFunction } from 'express';
import { MiddlewareFunction } from './middlewareClass.middleware';

export class Middleware {
    
    static requireAuthentication(req: Request, res: Response, next: NextFunction){
        MiddlewareFunction.checkConnectApi(req, res, next);
    }

    static requireAdmin(req: Request, res: Response, next: NextFunction){
        MiddlewareFunction.checkIsAdmin(req, res, next);
    }
}