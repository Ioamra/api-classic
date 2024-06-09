import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config({path: './src/config/.env'});

export default class AuthenticationService {
    
    private static readonly secretKey = process.env.JWT_PRIVATE_KEY;
    
    static generateToken(payload: object, expiresIn: string): string {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    static verifyToken(token: string): object | string {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return 'Token expiré. Veuillez vous reconnecter.';
            } else {
                return 'Token invalide. Veuillez vous reconnecter.';
            }
        }
    }
}
