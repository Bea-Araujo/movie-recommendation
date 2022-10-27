
import { createFollowsTable, deleteFollowsById, getAllFollows, getFollowsById, insertIntoFollows } from "../DAO/FollowsDAO.js";
import { Follow } from "../Model/FollowsModel.js";
import { Post } from "../Model/PostModel.js";

function follow(app) {

    createFollowsTable()

    app.get('/follow/all', async (req, res) => {
        const rows = await getAllFollows();
        rows.length > 0 ? res.send(rows) : res.sendStatus(404)
    })

    app.get('/follow/:id', async (req, res) => {
        const id = req.params.id
        const [row] = await getFollowsById(id);
        row ? res.send(row) : res.sendStatus(404)
    })

    app.post('/follow/new', (req, res) => {
        const { userid, postid, like } = req.body;

        const newFollow = new Follow(userid, postid, like)
        insertIntoFollows(newFollow)
        res.sendStatus(200)
    })

    app.put('/follow/edit/:id', async (req, res) => {
        const id = req.params.id
        const { userid, postid, like } = req.body;

        const [{ USERID, POSTID, LIKE }] = await getPostById(id);

        const updatedFollow = new Post(
            userid || USERID,
            postid || POSTID,
            like || LIKE
        );

        editPostById(id, updatedFollow)
        res.sendStatus(200)
    })

    app.delete('/follow/delete/:id', (req, res) => {
        const id = req.params.id
        deleteFollowsById(id)
        res.sendStatus(200)
    })
}

export { follow }