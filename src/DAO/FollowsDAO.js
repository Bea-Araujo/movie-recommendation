import { connectToDataBase } from "./DbDAO.js";

const createFollowsTable = (table) => {
    const db = connectToDataBase();
    const command = `CREATE TABLE IF NOT EXISTS FOLLOWS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        POSTID INTEGER,
        USERID INTEGER,
        LIKE VARCHAR(1),
        DISLIKE VARCHAR(1)
        );
    `
    db.run(command,
        (error) => {
            error ? console.log(error) : false;
        }
    ).close()
}

const getAllFollows = () => {
    const db = connectToDataBase();
    const selectCommand = `SELECT * FROM FOLLOWS;`

    return new Promise((resolve, reject) => {
        db.all(selectCommand, (error, rows) => {
            resolve(rows)
            reject(error)
        }).close()
    })

}

const getFollowsById = (id) => {
    const db = connectToDataBase();
    const selectCommand = `SELECT * FROM FOLLOWS WHERE ID=?;`

    return new Promise((resolve, reject) => {
        db.all(selectCommand, [id], (error, rows) => {
            resolve(rows)
            reject(error)
        }).close()
    })

}

const insertIntoFollows = ({ userid, postid, like }) => {
    const db = connectToDataBase();
    const insertCommand = `INSERT INTO FOLLOWS(USERID, POSTID, LIKE) VALUES(?, ?, ?);`

    db.run(insertCommand, [userid, postid, like], (error) => {
        if (error) console.log(error)
    }).close()
}

const editFollowsById = (id, { like }) => {
    const db = connectToDataBase();
    const updateCommand = `UPDATE FOLLOWS SET LIKE = ? WHERE ID = ?;`

    db.run(updateCommand, [like, id], (error) => {
        if (error) console.log(error)
    }).close()
}

const deleteFollowsById = (id) => {
    const db = connectToDataBase();
    const deleteCommand = `DELETE FROM FOLLOWS WHERE ID = ?;`

    db.run(deleteCommand, [id], (error) => {
        if (error) console.log(error)
    }).close()
}

export { createFollowsTable, getAllFollows, getFollowsById, insertIntoFollows, editFollowsById, deleteFollowsById }
