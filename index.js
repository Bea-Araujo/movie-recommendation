import express from 'express';
import { user } from './src/Controller/UserController.js';
import { getUserById, insertIntoUsers } from './src/DAO/UserDAO.js';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
})

user(app);

// getUserById(1)