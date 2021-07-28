import express from 'express';
import fileSystem from '../../file-system.js';
import comparingId from '../../comparing-props.js'

const deleteItem = express.Router();

deleteItem.delete('/:id',(req, res) => {
    const file = fileSystem('read');
    const array = JSON.parse(file);
    const {id} = req.params;
    try {
      if (!comparingId(id)) {
        throw Error('Task not found');
      }
      const removedArray = array.filter((item) => item.id !== id);
      const jsonItem = JSON.stringify(removedArray);
      fileSystem('write', jsonItem);
      res.status(200).send(jsonItem);
    }
    catch(e) {
      res.status(404).send(e.message);
    }
  });

  export default deleteItem;