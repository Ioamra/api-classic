import { Response } from "express";
import { pool } from "../../../config/db.config";

/**
 * La fonction « testMyAPI » dans TypeScript se connecte à une base de données, commence une
 * transaction, valide la transaction en cas de succès, annule la transaction si une erreur se produit
 * et envoie une réponse avec un message.
 * @param {string} test - Le paramètre `test` dans la fonction `testMyAPI` est une chaîne qui
 * représente le test en cours d'exécution dans le point de terminaison de l'API. Il est utilisé pour
 * fournir des informations supplémentaires ou un contexte sur le test spécifique en cours d'exécution.
 * @param {Response} res - Le paramètre `res` dans la fonction `testMyAPI` est généralement un objet
 * représentant la réponse HTTP qui sera renvoyée au client. Il est couramment utilisé pour définir le
 * code d'état de la réponse et renvoyer les données au client. Dans ce cas, il semble que ce soit un
 * exemple
 */
export const testMyAPI = async (test: string, res: Response) => {
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        
        await client.query('COMMIT');
        res.status(200).send({
            message: 'Working test ' + test,
        });
    }catch(e){
        await client.query('ROLLBACK');
        res.status(400).send({
            message: 'Error testMyAPI :' + e,
        });
    }finally{
        client.release(true);
    }
};