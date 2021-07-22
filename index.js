import express, { json } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const __dirname = path.resolve();
const PORT = 5000;

const file = fs.readFileSync('database.json', 'utf8');
  if (file.length === 0) {
    fs.writeFileSync('database.json', JSON.stringify([]), 'utf8');
  }

app.listen(PORT, () => {
  console.log('1')
});

app.post('/', (req, res) => {
  const array = JSON.parse(file);
  console.log(array);
  const item = req.body;
  item.id = array.length;
  item.time = new Date();
  array.push(item);
  res.status(201).json(item);
  const jsonItem = JSON.stringify(array);
  fs.writeFileSync('database.json', jsonItem, 'utf8');
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'database.json'));
});