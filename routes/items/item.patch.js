import express from 'express';
import fileSystem from '../../file-system.js';
import comparingId from '../../comparing-props.js';

const patchItem = express.Router();

patchItem.patch('/:id', (req, res) => {
  const array = fileSystem('read');
  const {id} = req.params;
  try {
    if (!comparingId(id)) {
      throw Error('Task not found');
    }
    const changedItem = req.body;
    const targetItem = array.find(item => item.id === id);
    for (let key in changedItem) {
      targetItem[key] = changedItem[key];
    }
    fileSystem('write', array);
    res.status(200).send(targetItem);
  }
  catch(e) {
    res.status(404).send(e.message);
  }
});

export default patchItem;