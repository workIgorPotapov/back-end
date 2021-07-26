import express, { json } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fileSystem from '../file-system.js';
import { body, validationResult } from 'express-validator';

const postItem = express.Router();

postItem.post(
  '/',
  body('name').isLength({ min: 2 }),
  body('name').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const file = fileSystem('read', 'database.json');
    const array = JSON.parse(file);
    const item = req.body;
    item.id = uuidv4();
    item.done = false;
    item.time = new Date();
    array.push(item);
    res.status(201);
    const jsonItem = JSON.stringify(array);
    fileSystem('write', 'database.json', jsonItem);
    res.send(jsonItem);
  });

  export default postItem;