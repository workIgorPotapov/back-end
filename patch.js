import express from 'express';
import fs from 'fs';

const patchItem = express.Router();

patchItem.patch('/:id', (req, res) => {
    const {id} = req.params;
    const file = fs.readFileSync('database.json');
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
    fs.writeFileSync('database.json', jsonItem, 'utf8');
    res.status(200);
    console.log(changedArray)
  });

  export default patchItem;