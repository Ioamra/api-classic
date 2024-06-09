import { Response } from "express";
import { pool } from "../../config/db.config";
import AuthenticationService from "../../config/jwt.config";
import { Users } from "../../models/users.models";

export const register = async (data: Users.IAddUsers, res: Response) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        if (!data.username_users) throw "username_users needed"; 
        if (!data.name_users) throw "name_users needed"; 
        if (!data.email_users) throw "email_users needed"; 
        if (!data.password_users) throw "password_users needed"; 
        const { rowCount: countEmail } = await client.query(`SELECT id_users FROM users WHERE email_users = $1;`, [data.email_users])
        if (countEmail > 0) throw "email already used"; 

        const { rows } = await client.query(`
            INSERT INTO users (username_users, name_users, email_users, password_users)
            VALUES ($1, $2, $3, $4)
            RETURNING id_users;
            `, [
                data.username_users, 
                data.name_users, 
                data.email_users, 
                data.password_users
            ]
        )

        const payload = { id_users: rows[0].id_users };
        const token = AuthenticationService.generateToken(payload, '1h');

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