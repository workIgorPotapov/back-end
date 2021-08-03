const express = require('express');
const fileSystem = require('../../file-system');
const { comparingId } = require('../../comparing-props');
const { NotFoundError } = require('../../errors');
const {Item}  = require('../../models/index')

const deleteItem = express.Router();

deleteItem.delete('/:id', async (req, res) => {
    // const array = fileSystem('read');
    const {id} = req.params;
    const delItem = await Item.findOne({ where: {uuid: id} });
    try {
      if (delItem === null) {
        throw new NotFoundError;
      }
      // const removedArray = array.filter((item) => item.uuid !== id);
      // fileSystem('write', removedArray);
      // res.sendStatus(204);
      delItem.destroy();
      res.sendStatus(204)
    }
    catch(e) {
      res.status(404).send([e]);
    }
    
});

module.exports = deleteItem;