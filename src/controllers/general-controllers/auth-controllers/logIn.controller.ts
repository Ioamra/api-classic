import { Response } from "express";
import { pool } from "../../../config/db.config";
import AuthenticationService from "../../../config/jwt.config";

export const logIn = async (email_users: string, password_users: string, res: Response) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const { rows, rowCount } = await client.query(`SELECT id_users, role_users FROM users WHERE email_users = $1 AND password_users = $2;`, [email_users, password_users])
        if (rowCount == 0) {
            throw "user not found"
        }
        const payload = { id_users: rows[0].id_users, role_users: rows[0].role_users };
        const token = AuthenticationService.generateToken(payload);

        res.status(200).send({
            message: "Connection successfull",
            data: token
            });
        await client.query("COMMIT");

    } catch (err) {
        await client.query("ROLLBACK");
        res.status(400).send({
            message: err + " : email or password incorect"
        });
    } finally {
        client.release(true);
    }


}