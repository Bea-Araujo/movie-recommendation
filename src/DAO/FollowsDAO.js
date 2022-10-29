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

const getFollowsByIds = (userid, postid) => {
    const db = connectToDataBase();
    const selectCommand = `SELECT * FROM FOLLOWS WHERE USERID=? AND POSTID=?;`

    return new Promise((resolve, reject) => {
        db.all(selectCommand, [userid, postid], (error, rows) => {
            resolve(rows)
            reject(error)
        }).close()
    })

}

const insertIntoFollows = ({ userid, postid, like, dislike }) => {
    const db = connectToDataBase();
    const insertCommand = `INSERT INTO FOLLOWS(USERID, POSTID, LIKE, DISLIKE) VALUES(?, ?, ?, ?);`

    db.run(insertCommand, [userid, postid, like, dislike], (error) => {
        if (error) console.log(error)
    }).close()
}

const editFollowsByIds = ({ like, dislike, userid, postid }) => {
    const db = connectToDataBase();
    const updateCommand = `UPDATE FOLLOWS SET LIKE = ?, DISLIKE = ? WHERE USERID=? AND POSTID=?;`

    db.run(updateCommand, [like, dislike, userid, postid], (error) => {
        if (error) console.log(error)
    }).close()
}

const deleteFollowsByIds = (userid, postid) => {
    const db = connectToDataBase();
    const deleteCommand = `DELETE FROM FOLLOWS WHERE USERID=? AND POSTID=?;`

    db.run(deleteCommand, [userid, postid], (error) => {
        if (error) console.log(error)
    }).close()
}

export { createFollowsTable, getAllFollows, getFollowsByIds, insertIntoFollows, editFollowsByIds, deleteFollowsByIds }
