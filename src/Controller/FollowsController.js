
import { createFollowsTable, deleteFollowsByIds, editFollowsByIds, getAllFollows, getFollowsByIds, insertIntoFollows } from "../DAO/FollowsDAO.js";
import { Follow } from "../Model/FollowsModel.js";

function follow(app) {

    createFollowsTable()

    app.get('/follow/all', async (req, res) => {
        const rows = await getAllFollows();
        rows.length > 0 ? res.send(rows) : res.sendStatus(404)
    })

    app.get('/follow/:userid/:postid', async (req, res) => {
        const userid = req.params.userid
        const postid = req.params.postid
        const [row] = await getFollowsByIds(userid, postid);
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
        const { userid, postid, like, dislike } = req.body;

        const [{ USERID, POSTID, LIKE, DISLIKE }] = await getFollowsById(id);

        const updatedFollow = new Follow(
            userid || USERID,
            postid || POSTID,
            like ? like : LIKE,
            dislike ? dislike : DISLIKE,
        );

        editFollowsByIds(updatedFollow)
        res.sendStatus(200)
    })

    app.delete('/follow/delete/:id', (req, res) => {
        const id = req.params.id
        deleteFollowsById(id)
        res.sendStatus(200)
    })
}

export { follow }