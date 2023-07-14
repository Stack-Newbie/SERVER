import mssql from 'mssql';
import { ConnectionPool, Request } from 'mssql';
import { SQL_SERVER_CONFIG } from '../config/db-config';
/* EXPORT HELPER CLASS : DB_OPERATIONS */
export class DB_OPERATIONS {
    private static pool: Promise<ConnectionPool> = mssql.connect(SQL_SERVER_CONFIG);

    /* APPEND REQUESTS TO INPUT */
    static appendRequests(request: Request, data: { [x: string]: string | number } = {}) {
        const keys = Object.keys(data);
        keys.forEach(key => {
            request.input(key, data[key]);
        });
        return request;
    }

    /* DECORATOR FOR RETRYING EXECUTION IN CASE OF FAILURE */
    @retry(3)
    /* EXECUTE STORED PROCEDURES */
    static async EXECUTE(storedProcedure: string, data: { [x: string]: string | number } = {}) {
        let request: Request = await (await this.pool).request();
        request = DB_OPERATIONS.appendRequests(request, data);
        return await request.execute(storedProcedure);
    }

    /* DECORATOR FOR LOGGING EXECUTED QUERIES */
    @logQuery
    /* EXECUTE QUERIES */
    static async QUERY(queryString: string) {
        return (await (await DB_OPERATIONS).pool).request().query(queryString);
    }
}

/* DECORATOR FOR RETRYING EXECUTION IN CASE OF FAILURE */
function retry(maxAttempts: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const TARGET_METHOD = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    return await TARGET_METHOD.apply(this, args);
                } catch (error) {
                    console.error(`Attempt ${attempt}/${maxAttempts} failed. Retrying...`)
                    if (attempt === maxAttempts) {
                        throw error;
                    }
                }
            }
        }
    }
}

/* DECORATOR FOR LOGGING EXECUTED QUERIES */
function logQuery(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const TARGET_METHOD = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        console.log(`Executing query: %{args[0]}`);
        return await TARGET_METHOD.apply(this, args);
    }
}