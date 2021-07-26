import express, { json } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fileSystem from './file-system.js';

const postItem = express.Router();

postItem.post('/', (req, res) => {
    const file = fileSystem('read', 'database.json');
    const array = JSON.parse(file);
    const item = req.body;
    item.id = uuidv4();
    item.done = false;
    item.time = new Date();
    array.push(item);
    res.status(201).json(item);
    const jsonItem = JSON.stringify(array);
    fileSystem('write', 'database.json', jsonItem);
  });

  export default postItem;