import { Response } from "express";
import { pool } from "../../../config/db.config";

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