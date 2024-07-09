import { Response } from "express";
import { pool } from "../../../config/db.config";
import AuthenticationService from "../../../config/jwt.config";
import { sha3_512 } from 'js-sha3';

/**
 * La fonction « logIn » de TypeScript gère l'authentification des utilisateurs en interrogeant la base
 * de données pour obtenir un e-mail et un mot de passe correspondant, en générant un jeton en cas de
 * connexion réussie et en gérant les erreurs de manière appropriée.
 * @param {string} email_users - Le paramètre `email_users` dans la fonction `logIn` représente
 * l'adresse e-mail de l'utilisateur essayant de se connecter. Il s'agit d'un paramètre de type chaîne
 * qui est utilisé pour identifier l'utilisateur dans la base de données lors de la tentative
 * d'authentification de ses informations de connexion.
 * @param {string} password_users - Le paramètre `password_users` dans la fonction `logIn` est une
 * chaîne qui représente le mot de passe fourni par l'utilisateur essayant de se connecter. Ce mot de
 * passe est utilisé dans la requête de base de données pour vérifier s'il correspond au mot de passe
 * associé à l'adresse e-mail fournie dans le tableau des « utilisateurs ». Si le mot de passe
 * @param {Response} res - Le paramètre `res` dans la fonction `logIn` est généralement utilisé pour
 * renvoyer une réponse au client qui fait la demande. Dans ce cas, il semble qu'il s'agisse d'une
 * instance de l'objet « Response », qui provient probablement d'un framework Web comme Express.js.
 */
export const logIn = async (email_users: string, password_users: string, res: Response) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        
        const { rows, rowCount } = await client.query(`SELECT id_users, role_users FROM users WHERE email_users = $1 AND password_users = $2;`, [email_users, sha3_512(password_users)])
        if (rowCount == 0) {
            throw "user not found"
        }
        const payload = { id_users: rows[0].id_users, role_users: rows[0].role_users };
        const token = AuthenticationService.generateToken(payload);
console.log(token)
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