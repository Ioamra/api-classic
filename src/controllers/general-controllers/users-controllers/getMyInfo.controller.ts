import { Response } from "express";
import { pool } from "../../../config/db.config";

/**
 * La fonction `getMyInfo` récupère les informations utilisateur en fonction de l'ID utilisateur et
 * envoie une réponse avec les données ou un message d'erreur.
 * @param {number} id_users - Le paramètre `id_users` est l'identifiant unique de l'utilisateur pour
 * lequel vous souhaitez récupérer des informations. Cette fonction « getMyInfo » est conçue pour
 * récupérer des détails d'utilisateur spécifiques tels que le nom d'utilisateur, le nom, l'adresse
 * e-mail et le rôle en fonction des « id_users » fournis.
 * @param {Response} res - Le paramètre `res` dans la fonction `getMyInfo` est généralement utilisé
 * pour renvoyer la réponse au client qui fait la demande. Dans ce cas, il semble s'agir d'une instance
 * de l'objet « Response », qui est couramment utilisé dans les frameworks de développement Web comme
 * Express.js pour gérer les réponses HTTP.
 */
export const getMyInfo = async (id_users: number, res: Response) => {
    const client = await pool.connect();
    try{
        const { rows } = await client.query(`SELECT id_users, username_users, name_users, email_users, role_users FROM users WHERE id_users = $1`, [id_users]);
        res.status(200).send({
            message: 'success',
            data: rows[0]
        });
    }catch(e){
        await client.query('ROLLBACK');
        res.status(400).send({
            message: 'Error getMyInfo :' + e,
        });
    }finally{
        client.release(true);
    }
};