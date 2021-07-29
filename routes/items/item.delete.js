const express = require('express');
const fileSystem = require('../../file-system');
const comparingId = require('../../comparing-props');

const deleteItem = express.Router();

deleteItem.delete('/:id', async (req, res) => {
    const array = fileSystem('read');
    const {id} = req.params;
    console.log(req.params, id)
    try {
      // if (!comparingId(id)) {
      //   throw Error('Task not found');
      // }
      const removedArray = array.filter((item) => item.uuid !== id);
      await fileSystem('write', removedArray);
      res.status(204);
    }
    catch(e) {
      console.log(e)
      res.status(404).send(e.message);
    }
  });

module.exports = deleteItem;