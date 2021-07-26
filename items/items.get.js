import express from 'express';
import fileSystem from '../file-system.js';

const getItems = express.Router();

if (!fileSystem('exists', 'database.json')) {
  fileSystem('write', 'database.json', JSON.stringify([]));
}

const file = fileSystem('read', 'database.json');
const array = JSON.parse(file);

const reqHandler = (filter, order, page) => {
  const compare = (a, b) => {
    if (a.time < b.time) {
      return -1;
    } else if (a.time > b.time) {
      return 1;
    } else {
      return 0;
    }
  }

  const pagination = (array, page) => {
    const lastItemIndex = page * 5;
    const firstItemIndex = lastItemIndex - 5;
    const currentPage = array.slice(firstItemIndex, lastItemIndex);
    return currentPage;
  }

  const filtration = (array) => {
    let filteredDone = array.filter((item) => { return item.done !== false });
    let filteredUndone = array.filter((item) => { return item.done !== true });
    if ( filter === 'done') {
      return pagination(filteredDone, page);
    }
    if ( filter === 'undone') {
      return pagination(filteredUndone, page);
    }
    if ( !filter ) {
      return pagination(array, page);
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
  const {filterBy, order, page} = req.query;

  const resArr = reqHandler(filterBy, order, page);
  res.status(200);
  const jsonItem = JSON.stringify(resArr);
  res.send(jsonItem);
});

export default getItems;