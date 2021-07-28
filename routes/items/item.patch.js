import express from 'express';
import fileSystem from '../../file-system.js';
import comparingId from '../../comparing-props.js';

const patchItem = express.Router();

patchItem.patch('/:id', (req, res) => {
  const file = fileSystem('read');
  const array = JSON.parse(file);
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
    const jsonItem = JSON.stringify(array);
    fileSystem('write', jsonItem);
    res.status(200).send(jsonItem);
  }
  catch(e) {
    res.status(404).send(e.message);
  }
});

export default patchItem;