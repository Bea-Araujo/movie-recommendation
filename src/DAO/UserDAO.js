import sqlite3 from 'sqlite3';

const connectToDataBase = () => new sqlite3.Database('./src/infra/database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

const createTable = (table) => {
    const db = connectToDataBase();
    const command = `CREATE TABLE IF NOT EXISTS ${table} (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        USERNAME VARCHAR(50), 
        PASSWORD VARCHAR(50)
        );
    `
    db.run(command,
        (error) => {
            error ? console.log(error) : false;
        }
    ).close()
}

const getAllUsers = () => {
    const db = connectToDataBase();
    const selectCommand = `SELECT * FROM USERS;`

    return new Promise((resolve, reject) => {
        db.all(selectCommand, (error, rows) => {
            resolve(rows)
            reject(error)
        }).close()
    })

}

const getUserById = (id) => {
    const db = connectToDataBase();
    const selectCommand = `SELECT * FROM USERS WHERE ID=?;`

    return new Promise((resolve, reject) => {
        db.all(selectCommand, [id], (error, rows) => {
            resolve(rows)
            reject(error)
        }).close()
    })

}

const insertIntoUsers = ({ username, password }) => {
    const db = connectToDataBase();
    const insertCommand = `INSERT INTO USERS(USERNAME, PASSWORD) VALUES(?, ?);`

    db.run(insertCommand, [username, password], (error) => {
        if (error) console.log(error)
    }).close()
}

const editUserById = (id, { username, password }) => {
    const db = connectToDataBase();
    const updateCommand = `UPDATE USERS SET USERNAME = ?, PASSWORD = ? WHERE ID = ?;`

    db.run(updateCommand, [username, password, id], (error) => {
        if (error) console.log(error)
    }).close()
}

const deleteUserById = (id) => {
    const db = connectToDataBase();
    const deleteCommand = `DELETE FROM USERS WHERE ID = ?;`

    db.run(deleteCommand, [id], (error) => {
        if (error) console.log(error)
    }).close()
}

export { createTable, getAllUsers, getUserById, insertIntoUsers, editUserById, deleteUserById }