const express = require('express');
const fileSystem = require('../../file-system');

const getItems = express.Router();

if (!fileSystem('exists')) {
  fileSystem('write', []);
}

const arrayItems = fileSystem('read');

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

  const pagination = (array) => {
    const lastItemIndex = page * 5;
    const firstItemIndex = lastItemIndex - 5;
    const currentPage = array.slice(firstItemIndex, lastItemIndex);
    return currentPage;
  }

  const filtration = (array) => {
    if (filter === undefined) {
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

getItems.get('/', async (req, res) => {
  const {filterBy, order, page} = req.query;
  const resArr = await reqHandler(filterBy, order, page);
  const jsonItem = JSON.stringify(resArr);
  res.status(200).send(jsonItem);
});

module.exports = getItems;