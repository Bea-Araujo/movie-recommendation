import { createUsersTable, deleteUserById, editUserById, getAllUsers, getUserById, insertIntoUsers } from "../DAO/UserDAO.js"
import { User } from "../Model/UserModel.js"

function user(app) {

    createUsersTable()

    app.get('/user/all', async (req, res) => {
        const rows = await getAllUsers();
        res.send(rows)
    })

    app.get('/user/:id', async (req, res) => {
        const id = req.params.id
        const [row] = await getUserById(id);
        row ? res.send(row) : res.sendStatus(404)
    })

    app.post('/user/new', (req, res) => {
        const { username, password } = req.body;
        const newUser = new User(username, password);
        insertIntoUsers(newUser)
        res.sendStatus(200)
    })

    app.put('/user/edit/:id', async (req, res) => {
        const id = req.params.id
        const { username, password } = req.body;
        const [{ USERNAME, PASSWORD }] = await getUserById(id);

        const updatedUser = new User(
            username || USERNAME,
            password || PASSWORD
        );
        editUserById(id, updatedUser)
        res.sendStatus(200)
    })

    app.delete('/user/delete/:id', (req, res) => {
        const id = req.params.id
        deleteUserById(id)
        res.sendStatus(200)
    })
}

export { user }