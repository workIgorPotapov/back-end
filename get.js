import express from 'express';
import fs from 'fs';
import fileSystem from './file-system.js';

const getItems = express.Router();

const file = fileSystem('read', 'database.json');
const array = JSON.parse(file);

const reqHandler = (filter, order) => {
  const compare = (a, b) => {
    if (a.time < b.time) {
      return -1;
    } else if (a.time > b.time) {
      return 1;
    } else {
      return 0;
    }
  }

  const filtration = (array) => {
    let filteredDone = array.filter((item) => { return item.done !== false });
    let filteredUndone = array.filter((item) => { return item.done !== true });
    if ( filter === 'done') {
      return filteredDone;
    }
    if ( filter === 'undone') {
      return filteredUndone;
    }
    if ( !filter ) {
      return array;
    }
  }

  let sortedArr = [...array].sort(compare);
  if (order === 'asc') {
    return filtration(sortedArr);
  }
  if (order === 'desc') {
    sortedArr.reverse();
    return filtration(sortedArr);
  }
}

getItems.get('/', (req, res) => {

  const {filterBy, order} = req.query;

  const resArr = reqHandler(filterBy, order);

  res.status(200);
    const jsonItem = JSON.stringify(resArr);
    res.send(jsonItem);
});

export default getItems;