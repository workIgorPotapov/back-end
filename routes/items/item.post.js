import express, { json } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fileSystem from '../../file-system.js';
import { body, validationResult } from 'express-validator';
import { comparingName } from '../../comparing-props.js';

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
      res.status(422).send(errors);
      return;
    }
    try {
      const item = req.body;
      if (comparingName(item)) {
        throw Error('Item has been already created');
      }
      item.id = uuidv4();
      item.done = false;
      item.time = new Date();
      array.push(item);
      const jsonItem = JSON.stringify(array);
      fileSystem('write', jsonItem);
      res.status(201).send(jsonItem);
    }
    catch(e) {
      res.status(400).send(e.message);
    }
  });

  export default postItem;