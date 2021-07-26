import express from 'express';
import fileSystem from '../../file-system.js';

const patchItem = express.Router();

patchItem.patch('/:id', (req, res) => {
    const {id} = req.params;
    const file = fileSystem('read');
    const array = JSON.parse(file);
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
  });

  export default patchItem;