import { Pool } from 'pg';
import * as dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });

export const pool = new Pool({
    host: process.env.MODE === 'prod' ? process.env.DB_HOST : process.env.LOCAL_DB_HOST,
    port: process.env.MODE === 'prod' ? parseInt(process.env.DB_PORT as string) : parseInt(process.env.LOCAL_DB_PORT as string),
    user: process.env.MODE === 'prod' ? process.env.DB_USER : process.env.LOCAL_DB_USER,
    password: process.env.MODE === 'prod' ? process.env.DB_PASSWORD : process.env.LOCAL_DB_PASSWORD,
    database: process.env.MODE === 'prod' ? process.env.DB_NAME : process.env.LOCAL_DB_NAME,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 20000,
    max: 20000,
    allowExitOnIdle: true,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error(`[POSTGRESQL] Erreur de connexion a la base de donnée ${process.env.MODE === 'prod' ? process.env.DB_NAME : process.env.LOCAL_DB_NAME} : `, err+'\n');
    }
    client!.query('SELECT NOW()', (err, result) => {
        release(true);
        if (err) {
            return console.error(`[POSTGRESQL] Erreur de connexion a la base de donnée ${process.env.MODE === 'prod' ? process.env.DB_NAME : process.env.LOCAL_DB_NAME} : `, err+'\n');
        }
        console.log(`Connexion a la base de donnée ${process.env.MODE === 'prod' ? process.env.DB_NAME : process.env.LOCAL_DB_NAME} établie.\n`);
    })
});