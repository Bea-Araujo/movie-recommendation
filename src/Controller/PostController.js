import { createPostsTable, deletePostById, getAllPosts, getPostById, insertIntoPosts } from "../DAO/PostsDAO.js";
import { Post } from "../Model/PostModel.js";

function post(app) {

    createPostsTable()

    app.get('/post/all', async (req, res) => {
        const rows = await getAllPosts();
        rows.length > 0 ? res.send(rows) : res.sendStatus(404)
    })

    app.get('/post/:id', async (req, res) => {
        const id = req.params.id
        const [row] = await getPostById(id);
        row ? res.send(row) : res.sendStatus(404)
    })

    app.post('/post/new', (req, res) => {
        const { title } = req.body;
        // have to look for userid
        const userid = 0;
        const status = 1;
        const followers = 0;
        const likes = 0;
        const dislikes = 0;
        const newPost = new Post(userid, status, title, followers, likes, dislikes)
        insertIntoPosts(newPost)
        res.sendStatus(200)
    })

    app.put('/post/edit/:id', async (req, res) => {
        const id = req.params.id
        const { status, title, followers, likes, dislikes } = req.body;
        const [{ STATUS, TITLE, FOLLOWERS, LIKES, DISLIKES }] = await getPostById(id);

        const updatedPost = new Post(
            status || STATUS,
            title || TITLE,
            followers || FOLLOWERS,
            likes || LIKES,
            dislikes || DISLIKES
        );
        edit(id, updatedPost)
        res.sendStatus(200)
    })

    app.delete('/post/delete/:id', (req, res) => {
        const id = req.params.id
        deletePostById(id)
        res.sendStatus(200)
    })
}

export { post }