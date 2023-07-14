import mssql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
// CONFIGURE DOTENV PATH
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
/* SQL SERVER CONFIGURATION */
export const SQL_SERVER_CONFIG = {
    /* REPLACE WITH DUMMY CREDENTIALS */
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    server: process.env.DB_SERVER as string,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    } 
}


/* TEST CONNECTION */
export const establishConnection = async () => {
    const pool = await mssql.connect(SQL_SERVER_CONFIG);
    if (pool) {
        console.log('Connected to database...');
    }
}
