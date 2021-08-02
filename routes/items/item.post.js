const express = require('express');
const fileSystem = require('../../file-system');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const comparingName = require('../../comparing-props');

const postItem = express.Router();

// 123

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
      const array = fileSystem('read');
      const item = req.body;
      if (comparingName(item)) {
        throw new Error('Item has been already created');
      }
      item.uuid = uuidv4();
      item.done = false;
      item.createdAt = new Date();
      await array.push(item);
      fileSystem('write', array);
      res.sendStatus(201);
      res.end()
    }
    catch(e) {
      res.status(400).send(e);
    }
  });

  module.exports = postItem;