import express from 'express';
import fs from 'fs';

const getItems = express.Router();

const file = fs.readFileSync('database.json');
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
    let filteredArray;
    if ( filter === 'done') {
      filteredArray = array.filter((item) => { return item.done !== false });
    }
    if ( filter === 'undone') {
      filteredArray = array.filter((item) => { return item.done !== true });
    }
    if ( !filter ) {
      return filteredArray = [...array];
    }
    return filteredArray;
  }

  let sortedArr;
  if (order === 'asc') {
    sortedArr = [...array].sort(compare);
    return filtration(sortedArr);
  }
  if (order === 'desc') {
    sortedArr = [...array].sort(compare).reverse();
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