import express from 'express';
import { post } from './src/Controller/PostController.js';
import { user } from './src/Controller/UserController.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
})

user(app);
post(app);
