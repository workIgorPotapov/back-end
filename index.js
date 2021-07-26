import express, { json } from 'express';
import path from 'path';
import fs from 'fs';
import getItems from './get.js';
import postItem from './post.js';
import patchItem from './patch.js';
import deleteItem from './delete.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const __dirname = path.resolve();
const PORT = 5000;

if (!fs.existsSync('database.json')) {
  fs.writeFileSync('database.json', JSON.stringify([]));
}


app.use('/', getItems);
app.use('/', postItem);
app.use('/', patchItem);
app.use('/', deleteItem);


app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`)
});