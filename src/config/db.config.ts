import { Pool } from 'pg';

// export const pool = new Pool({
//     host: process.env.MODE === 'prod' ? process.env.DB_HOST : process.env.LOCAL_DB_HOST,
//     port: parseInt(process.env.LOCAL_DB_PORT as string),
//     user: 'postgres',
//     password: "postgres",
//     database: process.env.LOCAL_DB_NAME,
//     idleTimeoutMillis: 3000,
//     connectionTimeoutMillis: 20000,
//     max: 20000,
//     allowExitOnIdle: true,
// });

export const pool = new Pool({
    host: process.env.MODE === 'prod' ? process.env.DB_HOST : process.env.LOCAL_DB_HOST,
    port: process.env.MODE === 'prod' ? parseInt(process.env.DB_PORT as string) : parseInt(process.env.LOCAL_DB_PORT as string),
    // user: process.env.MODE === 'prod' ? process.env.DB_USER : process.env.LOCAL_DB_USER,
    // password: process.env.MODE === 'prod' ? process.env.DB_PASSWORD : process.env.LOCAL_DB_PASSWORD,
    user: 'postgres',
    password: 'postgres',
    database: process.env.MODE === 'prod' ? process.env.DB_NAME : process.env.LOCAL_DB_NAME,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 20000,
    max: 20000,
    allowExitOnIdle: true,
});

pool.connect((err, client, release) => {
    console.log("host => "+typeof process.env.DB_HOST)
    console.log("port => "+typeof parseInt(process.env.DB_PORT as string))
    console.log("user => "+typeof process.env.DB_USER)
    console.log("password => "+typeof process.env.DB_PASSWORD)
    console.log("database => "+typeof process.env.DB_NAME)
    console.log("_____________________________")
    console.log("host => "+process.env.LOCAL_DB_HOST)
    console.log("port => "+process.env.LOCAL_DB_PORT)
    console.log("user => "+process.env.LOCAL_DB_USER)
    console.log("password => "+process.env.LOCAL_DB_PASSWORD)
    console.log("database => "+process.env.LOCAL_DB_NAME)
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