import { Response, Request } from "express";
import { pool } from "../../config/db.config";

export const logIn = async (mail: string, password: string, res: Response, req: Request) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        res.status(200).send({
            message: "Connection successfull",
            data: ""
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