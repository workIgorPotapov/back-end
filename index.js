import express from 'express';
import getItems from './routes/items/items.get.js';
import postItem from './routes/items/item.post.js';
import patchItem from './routes/items/item.patch.js';
import deleteItem from './routes/items/item.delete.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 5000;

app.use('/', getItems);
app.use('/', postItem);
app.use('/', patchItem);
app.use('/', deleteItem);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`)
});