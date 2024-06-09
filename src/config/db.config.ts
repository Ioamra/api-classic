import { Pool } from 'pg';

export const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: "postgres",
    database: 'api_classic',
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 20000,
    max: 20000,
    allowExitOnIdle: true,
});

// export const pool = new Pool({
//     host: process.env.MODE === 'prod' ? process.env.DB_HOST : process.env.LOCAL_DB_HOST,
//     port: process.env.MODE === 'prod' ? parseInt(process.env.DB_PORT as string) : parseInt(process.env.LOCAL_DB_PORT as string),
//     user: 'postgres',
//     password: () => process.env.LOCAL_DB_PASSWORD!,
//     database: process.env.MODE === 'prod' ? process.env.DB_NAME : process.env.LOCAL_DB_NAME,
//     idleTimeoutMillis: 3000,
//     connectionTimeoutMillis: 20000,
//     max: 20000,
//     allowExitOnIdle: true,
// });

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