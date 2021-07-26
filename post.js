import express, { json } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const postItem = express.Router();

postItem.post('/', (req, res) => {
    const file = fs.readFileSync('database.json');
    const array = JSON.parse(file);
    const item = req.body;
    item.id = uuidv4();
    item.done = false;
    item.time = new Date();
    array.push(item);
    res.status(201).json(item);
    const jsonItem = JSON.stringify(array);
    fs.writeFileSync('database.json', jsonItem, 'utf8');
  });

  export default postItem;