import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

import { getUsers, addUser, updateUser } from './controllers/users-controllers.js';

const app = express();
const puerto = 3001;

app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.get("/", (req, res) => {
    res.send("Api usuarios arriba");
});

app.get("/users", getUsers);

app.post("/users/add", addUser);

app.put("/users/:id", updateUser);

app.listen(puerto, () =>{
    console.log("Server arriba puerto: " + puerto);
});