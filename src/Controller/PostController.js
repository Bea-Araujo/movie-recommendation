import { createPostsTable, deletePostById, editPostById, getAllPosts, getPostById, insertIntoPosts } from "../DAO/PostsDAO.js";
import { Post } from "../Model/PostModel.js";

function post(app) {

    createPostsTable()

    app.get('/post/all', async (req, res) => {
        const rows = await getAllPosts();
        res.send(rows)
    })

    app.get('/post/:id', async (req, res) => {
        const id = req.params.id
        const [row] = await getPostById(id);
        row ? res.send(row) : res.sendStatus(404)
    })

    app.post('/post/new', (req, res) => {
        const { userid, title } = req.body;
        // have to look for userid
        const status = 'OPEN';
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

        const [{ USERID, STATUS, TITLE, FOLLOWERS, LIKES, DISLIKES }] = await getPostById(id);

        const updatedPost = new Post(
            USERID,
            status || STATUS,
            title || TITLE,
            followers ? followers : FOLLOWERS,
            likes ? likes : LIKES,
            dislikes ? dislikes : DISLIKES
        );
        console.log(updatedPost)
        editPostById(id, updatedPost)
        res.sendStatus(200)
    })

    app.delete('/post/delete/:id', (req, res) => {
        const id = req.params.id
        deletePostById(id)
        res.sendStatus(200)
    })
}

export { post }