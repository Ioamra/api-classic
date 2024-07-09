import { Response } from "express";
import { pool } from "../../../config/db.config";
import AuthenticationService from "../../../config/jwt.config";
import { Users } from "../../../models/general-models/users.models";
import { sha3_512 } from 'js-sha3';

/**
 * La fonction `register` est une fonction asynchrone qui ajoute un nouvel utilisateur à une base de
 * données, gère les cas de validation et d'erreur et renvoie un jeton en cas d'enregistrement réussi.
 * @param data - Le paramètre `data` dans la fonction `register` est un objet de type
 * `Users.IAddUsers`. Il contient les propriétés suivantes :
 * @param {Response} res - Le paramètre `res` dans la fonction `register` est de type `Response`, qui
 * est généralement utilisé dans Express.js pour renvoyer une réponse au client effectuant la demande.
 * Il vous permet de définir le code d'état, de renvoyer les données dans le corps de la réponse et
 * d'effectuer d'autres opérations liées à la réponse.
 */
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
            RETURNING id_users, role_users;
            `, [
                data.username_users, 
                data.name_users, 
                data.email_users, 
                sha3_512(data.password_users)
            ]
        )

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