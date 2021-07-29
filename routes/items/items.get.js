const express = require('express');
const fileSystem = require('../../file-system');

const getItems = express.Router();

if (!fileSystem('exists')) {
  fileSystem('write', []);
}

const reqHandler = (filter, order, page) => {
  const arrayItems = fileSystem('read');

  const compare = (a, b) => {
    if (a.time < b.time) {
      return -1;
    } else if (a.time > b.time) {
      return 1;
    } else {
      return 0;
    }
  }

  const pagination = (array) => {
    const lastItemIndex = page * 5;
    const firstItemIndex = lastItemIndex - 5;
    const currentPage = array.slice(firstItemIndex, lastItemIndex);
    return currentPage;
  }

  const filtration = (array) => {
    if (!filter) {
      return pagination(array);
    }
    const filteredArr = array.filter((item) => { return item.done === (filter === 'done') });
    return pagination(filteredArr);
  }

  let sortedArr = 
  (order === 'asc') ? [...arrayItems].sort(compare) : 
  [...arrayItems].sort(compare).reverse();
  return filtration(sortedArr);
}

getItems.get('/', (req, res) => {
  const {filterBy, order, page} = req.query;
  const resArr = reqHandler(filterBy, order, page);
  const jsonItem = JSON.stringify(resArr);
  res.status(200).send(jsonItem);
});

getItems.get('/t', (req, res) => {
  const arrayItems = fileSystem('read');
  const length = arrayItems.length.toString();
  res.send(Buffer.from(length));
});

module.exports = getItems;