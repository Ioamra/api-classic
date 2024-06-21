import jwt, { SignOptions, Algorithm } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });

export default class AuthenticationService {
    private static readonly privateKey: string = process.env.JWT_PRIVATE_KEY;
    private static readonly publicKey: string = process.env.JWT_PUBLIC_KEY;
    private static readonly algorithm: Algorithm = process.env.JWT_ALGORITHM as Algorithm;
    private static readonly expiresIn: string = process.env.JWT_EXPIRES_IN;

    /**
     * La fonction `generateToken` génère un jeton JWT avec une charge utile donnée à l'aide d'une clé
     * privée et d'options spécifiées.
     * @param {object} payload - Le paramètre `payload` dans la méthode `generateToken` est un objet qui
     * contient les données que vous souhaitez encoder dans le jeton JWT. Ces données peuvent inclure des
     * informations telles que les détails de l'utilisateur, les autorisations ou toute autre information
     * pertinente qui doit être transmise et vérifiée en toute sécurité.
     * @returns Un jeton JWT est renvoyé.
     */
    static generateToken(payload: object): string {
        const options: SignOptions = { expiresIn: this.expiresIn, algorithm: this.algorithm };
        return jwt.sign(payload, this.privateKey, options);
    }

    /**
     * La fonction « decodeToken » décode un jeton JWT à l'aide d'une clé publique et d'un algorithme,
     * renvoyant la charge utile décodée ou un message d'erreur si le jeton est expiré ou invalide.
     * @param {string} token - Le paramètre `token` est une chaîne qui représente un JWT (JSON Web
     * Token) qui doit être décodé pour extraire les informations qu'il contient.
     * @returns La fonction `decodeToken` renvoie soit le jeton décodé sous forme d'objet, soit un
     * message sous forme de chaîne indiquant si le jeton est expiré ou invalide.
     */
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
