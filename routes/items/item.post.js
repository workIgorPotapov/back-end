import express, { json } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fileSystem from '../../file-system.js';
import { body, validationResult } from 'express-validator';

const postItem = express.Router();

const file = fileSystem('read');
const array = JSON.parse(file);

postItem.post(
  '/',
  body('name').isLength({ min: 2 }),
  body('name').notEmpty(),
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      res.send({ errors: errors.array() });
      return;
    }
    const item = req.body;
    item.id = uuidv4();
    item.done = false;
    item.time = new Date();
    array.push(item);
    res.status(201);
    const jsonItem = JSON.stringify(array);
    fileSystem('write', jsonItem);
    res.send(jsonItem);
  });

  export default postItem;