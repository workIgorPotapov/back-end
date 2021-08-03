const express = require('express');
const fileSystem = require('../../file-system');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const { comparingName } = require('../../comparing-props');
const { BadRequestError } = require('../../errors');
const { Sequelize, DataTypes } = require('sequelize');
const {Item}  = require('../../models/index')


const postItem = express.Router();

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

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
      const task = req.body;      
      console.log(Item);
      const item = await Item.create({ name: req.body.name });    
      res.status(201).send(item);      
    }
    catch(e) {
      console.log(e);
      res.status(400).send([e]);
    }
  });

  module.exports = postItem;