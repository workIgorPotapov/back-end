import express from 'express';
import fs from 'fs';

const deleteItem = express.Router();

deleteItem.delete('/:id',(req, res) => {
    const {id} = req.params;
    const file = fs.readFileSync('database.json');
    const array = JSON.parse(file);
    const removedArray = array.filter((item) => item.id !== id);
    const jsonItem = JSON.stringify(removedArray);
    fs.writeFileSync('database.json', jsonItem, 'utf8');
    res.status(200);
    console.log(id)
    console.log(removedArray)
  });

  export default deleteItem;