import { connectToDataBase } from "./DbDAO.js";

const createPostsTable = (table) => {
    const db = connectToDataBase();
    const command = `CREATE TABLE IF NOT EXISTS POSTS (
        POSTID INTEGER PRIMARY KEY AUTOINCREMENT,
        USERID INTEGER,
        STATUS VARCHAR(10),
        TITLE VARCHAR(225),
        FOLLOWERS INTEGER,
        LIKES INTEGER,
        DISLIKES INTEGER
        );
    `
    db.run(command,
        (error) => {
            error ? console.log(error) : false;
        }
    ).close()
}

const getAllPosts = () => {
    const db = connectToDataBase();
    const selectCommand = `SELECT * FROM POSTS;`

    return new Promise((resolve, reject) => {
        db.all(selectCommand, (error, rows) => {
            resolve(rows)
            reject(error)
        }).close()
    })

}

const getPostById = (id) => {
    const db = connectToDataBase();
    const selectCommand = `SELECT * FROM POSTS WHERE POSTID=?;`

    return new Promise((resolve, reject) => {
        db.all(selectCommand, [id], (error, rows) => {
            resolve(rows)
            reject(error)
        }).close()
    })

}

const insertIntoPosts = ({ userid, title }) => {
    const db = connectToDataBase();
    const insertCommand = `INSERT INTO POSTS(USERID, TITLE, STATUS, FOLLOWERS, LIKES, DISLIKES) VALUES(?, ?, ?, ?, ?, ?);`

    db.run(insertCommand, [userid, title, 1, 0, 0, 0], (error) => {
        if (error) console.log(error)
    }).close()
}

const editPostById = (id, { status, followers, likes, dislikes }) => {
    /// não deve poder mudar o título
    const db = connectToDataBase();
    const updateCommand = `UPDATE POSTS SET STATUS = ?, FOLLOWERS = ?, LIKES = ?, DISLIKES = ? WHERE POSTID = ?;`

    db.run(updateCommand, [status, followers, likes, dislikes, id], (error) => {
        if (error) console.log(error)
    }).close()
}

const deletePostById = (id) => {
    const db = connectToDataBase();
    const deleteCommand = `DELETE FROM POSTS WHERE POSTID = ?;`

    db.run(deleteCommand, [id], (error) => {
        if (error) console.log(error)
    }).close()
}

export { createPostsTable, getAllPosts, getPostById, insertIntoPosts, editPostById, deletePostById }