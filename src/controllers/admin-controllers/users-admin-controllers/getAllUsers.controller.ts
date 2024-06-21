import { Response } from "express";
import { pool } from "../../../config/db.config";

/**
 * La fonction `getAllUsers` récupère tous les utilisateurs d'une base de données et envoie les données
 * en réponse avec les codes d'état appropriés.
 * @param {Response} res - Le paramètre `res` dans la fonction `getAllUsers` est généralement l'objet
 * de réponse utilisé pour renvoyer une réponse au client effectuant la demande. Il est couramment
 * utilisé dans le développement Web avec des frameworks comme Express.js dans Node.js pour envoyer des
 * réponses HTTP.
 */
export const getAllUsers = async (res: Response) => {
    const client = await pool.connect();
    try{
        const { rows } = await client.query('SELECT * FROM users;');
        res.status(200).send({
            message: 'success',
            data: rows
        });
    }catch(e){
        res.status(400).send({
            message: 'Error getAllUsers :' + e,
        });
    }finally{
        client.release(true);
    }
};