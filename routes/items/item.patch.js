const express = require('express');
const { Item }  = require('../../models/index');
const { NotFoundError } = require('../../errors');

const patchItem = express.Router();

patchItem.patch('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const { name, done } = req.body;
    const updItem = await Item.findOne({ where: {uuid: id} });
    if (!updItem) {
      throw new NotFoundError;
    }
    if (name) {
      updItem.name = name;
    }
    if (done) {
      updItem.done = done;
    }
    await updItem.save();
    res.sendStatus(200)
  }
  catch(e) {
    res.status(404).send([e]);
  }
});

module.exports = patchItem;