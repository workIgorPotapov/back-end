const express = require('express');
const fileSystem = require('../../file-system');
const comparingId = require('../../comparing-props');
const {Item}  = require('../../models/index');

const patchItem = express.Router();

patchItem.patch('/:id', async (req, res) => {
  // const array = fileSystem('read');
  const {id} = req.params;
  try {
    // if (comparingId(id)) {
    //   throw Error('Task not found');
    // }
    const changedItem = req.body;
    const updItem = await Item.findOne({ where: {uuid: id} });
    if (changedItem.name) {
      updItem.name = changedItem.name;
    }
    // const targetItem = array.find(item => item.uuid === id);
    // for (let key in changedItem) {
    //   targetItem[key] = changedItem[key];
    // }
    // fileSystem('write', array);
    // res.status(200).send(targetItem);

    // console.log(changedItem)
    // console.log(updItem)
    // for (let key in updItem) {
    //   updItem.dataValues[key] = changedItem[key];
    // }
    await updItem.save();
    res.sendStatus(200)
  }
  catch(e) {
    console.log(e)
    res.status(404).send(e);
  }
});

module.exports = patchItem;