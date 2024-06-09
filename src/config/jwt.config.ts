import jwt, { SignOptions, VerifyOptions, Algorithm } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });

export default class AuthenticationService {
    private static readonly privateKey: string = process.env.JWT_PRIVATE_KEY;
    private static readonly publicKey: string = process.env.JWT_PUBLIC_KEY;
    private static readonly algorithm: Algorithm = process.env.JWT_ALGORITHM as Algorithm;
    private static readonly expiresIn: string = process.env.JWT_EXPIRES_IN;

    static generateToken(payload: object): string {
        const options: SignOptions = { expiresIn: this.expiresIn, algorithm: this.algorithm };
        return jwt.sign(payload, this.privateKey, options);
    }

    static decodeToken(token: string): object | string {
        try {
            const decoded = jwt.verify(token, this.publicKey, { algorithms: [this.algorithm] });
            return decoded;
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return "Token expiré. Veuillez vous reconnecter.";
            } else {
                return "Token invalide. Veuillez vous reconnecter.";
            }
        }
    }
}
