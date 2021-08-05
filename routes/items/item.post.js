const express = require('express');
const { body, validationResult } = require('express-validator');
const { BadRequestError } = require('../../errors');
const { Item }  = require('../../models/index')

const postItem = express.Router();

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
      if (await Item.findOne({ where: {name: req.body.name} })) {
        throw new BadRequestError;
      }
      const item = await Item.create({ name: req.body.name });    
      res.status(201).send(item);      
    }
    catch(e) {
      res.status(400).send([e]);
    }
  });

  module.exports = postItem;