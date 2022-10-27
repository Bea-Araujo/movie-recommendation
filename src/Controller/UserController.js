import { createTable, deleteUserById, editUserById, getAllUsers, getUserById, insertIntoUsers } from "../DAO/UserDAO.js"
import { User } from "../Model/UserModel.js"

function user(app) {

    createTable('USERS')

    app.get('/allUsers', async (req, res) => {
        const rows = await getAllUsers();
        res.send(rows)
    })

    app.get('/user/:id', async (req, res) => {
        const id = req.params.id
        const [row] = await getUserById(id);
        row ? res.send(row) : res.sendStatus(404)
    })

    app.post('/newUser', (req, res) => {
        const { username, password } = req.body;
        const newUser = new User(username, password);
        insertIntoUsers(newUser)
        res.sendStatus(200)
    })

    app.put('/editUser/:id', async (req, res) => {
        const id = req.params.id
        const { username, password } = req.body;
        const [{ USERNAME: OLD_USERNAME, PASSWORD: OLD_PASSWORD }] = await getUserById(id);

        const updatedUser = new User(
            username || OLD_USERNAME,
            password || OLD_PASSWORD
        );
        editUserById(id, updatedUser)
        res.sendStatus(200)
    })

    app.delete('/deleteUser/:id', (req, res) => {
        const id = req.params.id
        deleteUserById(id)
        res.sendStatus(200)
    })
}

export { user }