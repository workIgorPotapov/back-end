import express from 'express';
import fileSystem from '../../file-system.js';

const patchItem = express.Router();

const file = fileSystem('read');
const array = JSON.parse(file);

const comparingId = (id) => {
  for (let keys of array) {
    if (keys.id === id) {
      return true;
    }
  }
}

patchItem.patch('/:id', (req, res) => {
  try {
    const {id} = req.params;
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