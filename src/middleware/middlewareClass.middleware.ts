import { Request, Response, NextFunction } from 'express';
import { pool } from "../config/db.config";
import { ErrorCode } from '../config/error.config';

export class MiddlewareFunction {

    static async checkConnectApi(req: Request, res: Response, next: NextFunction){
        const client = await pool.connect();
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw ErrorCode.MISSING_HEADERS;
            };
            
            const { rowCount } = await client.query('SELECT * FROM api_key WHERE key_api_key = $1', [token]);
            if(rowCount === 0){
                throw ErrorCode.ACCESS_DENIED;
            };

            return next();
        } catch (err) {
            console.error(err + ' : error middleware access API');
            return res.status(401).send({
                message: err + ' : error middleware access API'
            });
        }
    };

}