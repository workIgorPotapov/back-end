const { json } = require('express');
const express = require('express');
const fileSystem = require('../../file-system');
const {Item}  = require('../../models/index')

const getItems = express.Router();

if (!fileSystem('exists')) {
  fileSystem('write', []);
}

let showingItems;

const pagination = (page, array) => {
  const lastItemIndex = page * 5;
  const firstItemIndex = lastItemIndex - 5;
  const currentPage = array.slice(firstItemIndex, lastItemIndex);
  return currentPage;
}

const reqHandler = (filter, order) => {
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

  const filtration = (array) => {
    if (!filter) {
      return array;
    }
    const filteredArr = array.filter((item) => { return item.done === (filter === 'done') });
    return filteredArr;
  }

  let sortedArr = 
  (order === 'asc') ? [...arrayItems].sort(compare) : 
  [...arrayItems].sort(compare).reverse();
  return filtration(sortedArr);
}

getItems.get('/', async (req, res) => {
  // const {filterBy, order, page} = req.query;
  // const resArr = reqHandler(filterBy, order);
  // showingItems = resArr.length.toString();
  // const pagArr = pagination(page, resArr);
  // const result = {
  //   pagArr,
  //   showingItems,
  // };
  const items = await Item.findAll();
  res.status(200).send(items);
});

module.exports = getItems;