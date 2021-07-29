import express from 'express';
import getItems from './routes/items/items.get.js';
import postItem from './routes/items/item.post.js';
import patchItem from './routes/items/item.patch.js';
import deleteItem from './routes/items/item.delete.js';
import cors from 'cors';

const app = express();

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/', cors(), getItems);
app.use('/', cors(), patchItem);
app.use('/', cors(), deleteItem);
app.use('/', cors(), postItem);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`)
});