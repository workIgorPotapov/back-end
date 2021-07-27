import express from 'express';
import fileSystem from '../../file-system.js';
import comparingId from '../../comparing-id.js'

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
    const changedArray = array.map((item) => {
      if (item.id === id) {
        for (let key in changedItem) {
          item[key] = changedItem[key];
          return item;
        }
      } else {
        return item;
      }
    });
    const jsonItem = JSON.stringify(changedArray);
    fileSystem('write', jsonItem);
    res.status(200);
    res.send(jsonItem);
  }
  catch(e) {
    res.status(404).send(e.message);
  }
});

export default patchItem;