import { Response } from "express";
import { pool } from "../../config/db.config";
import AuthenticationService from "../../config/jwt.config";

export const logIn = async (mail: string, password: string, res: Response) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const payload = { id_user: 1, role_user: 'admin' };
        const token = AuthenticationService.generateToken(payload, '1h');

        res.status(200).send({
            message: "Connection successfull",
            data: token
            });
        await client.query("COMMIT");

    } catch (err) {
        await client.query("ROLLBACK");
        res.status(400).send({
            message: err + " : mauvais identifiant ou mot de passe",
            remaining: res.getHeader('Ratelimit-Remaining'),
            rateLimit: res.getHeader('Ratelimit-Limit')
        });
    } finally {
        client.release(true);
    }


}