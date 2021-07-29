const fileSystem = require('./file-system');

const comparingId = (id) => {
  const array = fileSystem('read');
  for (let keys of array) {
    if (keys.uuid === id) {
      return false;
    }
  }
}

const comparingName = (item) => {
  const array = fileSystem('read');
  for (let keys of array) {
    if (keys.name === item.name) {
      return true;
    }
  }
}

module.exports = (comparingId, comparingName)