const express = require('express');
const fileSystem = require('../../file-system');
const { comparingId } = require('../../comparing-props');
const { NotFoundError } = require('../../errors');

const deleteItem = express.Router();

deleteItem.delete('/:id', (req, res) => {
    const array = fileSystem('read');
    const {id} = req.params;
    try {
      if (comparingId(id) === false) {
        throw new NotFoundError;
      }
      const removedArray = array.filter((item) => item.uuid !== id);
      fileSystem('write', removedArray);
      res.sendStatus(204);
    }
    catch(e) {
      res.status(404).send(e);
    }
  });

module.exports = deleteItem;