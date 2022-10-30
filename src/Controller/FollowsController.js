
import { createFollowsTable, deleteFollowsByIds, editFollowsByIds, getAllFollows, getFollowsByIds, insertIntoFollows } from "../DAO/FollowsDAO.js";
import { Follow } from "../Model/FollowsModel.js";

function follow(app) {

    createFollowsTable()

    app.get('/follow/all', async (req, res) => {
        const rows = await getAllFollows();
        res.send(rows)
    })

    app.get('/follow/:userid/:postid', async (req, res) => {
        const userid = req.params.userid
        const postid = req.params.postid
        const row = await getFollowsByIds(userid, postid);
        row ? res.send(row) : res.sendStatus(404)
    })

    app.post('/follow/new', (req, res) => {
        const { userid, postid, like, dislike } = req.body;

        const newFollow = new Follow(userid, postid, like, dislike)

        insertIntoFollows(newFollow)
        res.sendStatus(200)
    })

    app.put('/follow/edit/:userid/:postid', async (req, res) => {
        const useridParam = req.params.userid
        const postidParam = req.params.postid
        const { userid, postid, like, dislike } = req.body;

        try {
            const [{ USERID, POSTID, LIKE, DISLIKE }] = await getFollowsByIds(useridParam, postidParam);
            const updatedFollow = new Follow(
                userid || USERID,
                postid || POSTID,
                like ? like : LIKE,
                dislike ? dislike : DISLIKE,
            );

            editFollowsByIds(updatedFollow)
            res.sendStatus(200)
        } catch (e) {
            console.log('Unable to update')
            res.send('Unable to update')
        }

    })

    app.delete('/follow/delete/:userid/:postid', (req, res) => {
        const useridParam = req.params.userid
        const postidParam = req.params.postid
        deleteFollowsByIds(useridParam, postidParam)
        res.sendStatus(200)
    })
}

export { follow }