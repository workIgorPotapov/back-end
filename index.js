const express = require('express');
const getItems = require('./routes/items/items.get');
const postItem = require('./routes/items/item.post');
const patchItem = require('./routes/items/item.patch');
const deleteItem = require('./routes/items/item.delete');
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT;

app.use('/', cors(), getItems);
app.use('/', cors(), patchItem);
app.use('/', cors(), deleteItem);
app.use('/', cors(), postItem);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`)
});