const express = require('express');
const { NotFoundError } = require('../../errors');
const { Item }  = require('../../models/index');

const deleteItem = express.Router();

deleteItem.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const delItem = await Item.findOne({ where: {uuid: id} });
    try {
      if (!delItem) {
        throw new NotFoundError;
      }
      delItem.destroy();
      res.sendStatus(204)
    }
    catch(e) {
      res.status(404).send([e]);
    }
    
});

module.exports = deleteItem;