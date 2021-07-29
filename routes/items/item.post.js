import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fileSystem from '../../file-system.js';
import { body, validationResult } from 'express-validator';
import { comparingName } from '../../comparing-props.js';

const postItem = express.Router();

const array = fileSystem('read');

postItem.post(
  '/',
  body('name').isLength({ min: 2 }).notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors);
      return;
    }
    try {
      const item = req.body;
      console.log(req.body)
      if (comparingName(item)) {
        throw Error('Item has been already created');
      }
      item.uuid = uuidv4();
      item.done = false;
      item.createdAt = new Date();
      await array.push(item);
      fileSystem('write', array);
      res.status(201).send(item);
    }
    catch(e) {
      res.status(400).send(e.message);
    }
  });

  export default postItem;