import { Request, Response, NextFunction } from 'express';
import { pool } from "../config/db.config";
import { ErrorCode } from '../config/error.config';
import AuthenticationService from '../config/jwt.config';
import { AccessTokenDecoded } from '../models/jwt.model';

export class MiddlewareFunction {

    static async checkConnectApi(req: Request, res: Response, next: NextFunction){
        const client = await pool.connect();
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw ErrorCode.MISSING_HEADERS;
            };

            const decodedToken = AuthenticationService.decodeToken(token) as AccessTokenDecoded;
            if (!decodedToken) {
                throw ErrorCode.MISSING_HEADERS;
            }

            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                throw 'expired token';
            }

            return next();
        } catch (err) {
            console.error(err + ' : error middleware access API');
            return res.status(401).send({
                message: err + ' : error middleware access API'
            });
        }
    };

    static async checkIsAdmin(req: Request, res: Response, next: NextFunction){
        const client = await pool.connect();
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw ErrorCode.MISSING_HEADERS;
            };

            const decodedToken = AuthenticationService.decodeToken(token) as AccessTokenDecoded;
            if (!decodedToken) {
                throw ErrorCode.MISSING_HEADERS;
            }

            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                throw 'expired token';
            }
            
            if (decodedToken.role_users != 'admin') {
                throw 'not admin';
            }

            const { rows } = await client.query(`SELECT role_users FROM users WHERE id_users = $1`, [decodedToken.id_users])
            if (rows[0].role_users != 'admin') {
                throw 'nice try but you are not admin';
            }

            return next();
        } catch (err) {
            console.error(err + ' : error middleware access API');
            return res.status(401).send({
                message: err + ' : error middleware access API'
            });
        }
    };
}