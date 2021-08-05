const express = require('express');
const {Item}  = require('../../models/index')

const getItems = express.Router();

getItems.get('/', async (req, res) => {
  const {filterBy, order, page} = req.query;
  const filter = {};
  if (filterBy) {
    (filterBy === 'done') ? filter.done = true : filter.done = false
  }
  const items = await Item.findAndCountAll({
    limit: 5,
    offset: (page - 1) * 5,
    order: [["createdAt", order]],
    where: filter,
  });
  res.status(200).send(items);
});

module.exports = getItems;