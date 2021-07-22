import express from 'express';
import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
const PORT = 4000;
const todo = [];

app.get('/', (req, res) => {
  res.send(todo);
});

app.post('/', (req, res) => {
  const item = req.body;
  item.id = todo.length;
  item.time = new Date();
  todo.push(item);
  res.status(201).send('done');
  console.log(todo);
});

app.delete('/', (req, res) => {

});

app.listen(PORT, () => {
  console.log('1')
});