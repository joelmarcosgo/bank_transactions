import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
    host: string;
}

export default async (host = "database_ignite"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    console.log('⚡️ DATABASE CONNECTION CREATED WITH SUCCESS! ⚡️')
    
    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_ENV === "test" 
                ? "localhost"
                : host,
            database:
                process.env.NODE_ENV === "test"
                    ? "bank_transactions_test"
                    : defaultOptions.database
        })
    )
}
// getConnectionOptions().then(options => {
//     const newOptions = options as IOptions;
//     newOptions.host = process.env.NODE_ENV === 'test' ? 'database_test' : 'database_ignite';
//     createConnection({
//         ...options,
//     }).then(() => console.log('⚡️ DATABASE CONNECTION CREATED WITH SUCCESS! ⚡️'));
// });