import sqlite3 from 'sqlite3';

const connectToDataBase = () => new sqlite3.Database('./src/infra/database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

export { connectToDataBase };