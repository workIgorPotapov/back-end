import express from 'express';
import fileSystem from '../../file-system.js';
import comparingId from '../../comparing-props.js'

const deleteItem = express.Router();

deleteItem.delete('/:id',(req, res) => {
    const array = fileSystem('read');
    const {id} = req.params;
    try {
      if (!comparingId(id)) {
        throw Error('Task not found');
      }
      const removedArray = array.filter((item) => item.uuid !== id);
      fileSystem('write', removedArray);
      res.status(204);
    }
    catch(e) {
      res.status(404).send(e.message);
    }
  });

  export default deleteItem;