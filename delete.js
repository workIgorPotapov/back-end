import express from 'express';
import fs from 'fs';
import fileSystem from './file-system.js';

const deleteItem = express.Router();

deleteItem.delete('/:id',(req, res) => {
    const {id} = req.params;
    const file = fileSystem('read', 'database.json');
    const array = JSON.parse(file);
    const removedArray = array.filter((item) => item.id !== id);
    const jsonItem = JSON.stringify(removedArray);
    fileSystem('write', 'database.json', jsonItem);
    res.status(200);
    console.log(id)
    console.log(removedArray)
  });

  export default deleteItem;