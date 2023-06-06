const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

const execute = (queryString, queryParams) => new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
        if (err) {
            reject(err.stack);
            return;
        }
        client.query(queryString, [...queryParams], (err, result) => {
            release();

            if (err) {
                reject(err.stack);
                return;
            }
            resolve(result.rows);
        });
    });
});

module.exports = {
    execute
}