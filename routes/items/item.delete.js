const express = require('express');
const fileSystem = require('../../file-system');
const comparingId = require('../../comparing-props');

const deleteItem = express.Router();

deleteItem.delete('/:id', (req, res) => {
    const array = fileSystem('read');
    const {id} = req.params;
    try {
      if (comparingId(id)) {
        throw Error('Task not found');
      }
      const removedArray = array.filter((item) => item.uuid !== id);
      fileSystem('write', removedArray);
      res.sendStatus(204);
    }
    catch(e) {
      res.status(404).send(e.message);
    }
  });

module.exports = deleteItem;