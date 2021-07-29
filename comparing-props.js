const fileSystem = require('./file-system');

const array = fileSystem('read');

const comparingId = (id) => {
  for (let keys of array) {
    if (keys.uuid === id) {
      return true;
    }
  }
}

const comparingName = (item) => {
  for (let keys of array) {
    if (keys.name === item.name) {
      return true;
    }
  }
}

module.exports = (comparingId, comparingName)