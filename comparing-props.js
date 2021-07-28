import fileSystem from './file-system.js';

const array = fileSystem('read');

const comparingId = (id) => {
  for (let keys of array) {
    if (keys.uuid === id) {
      return true;
    }
  }
}

export const comparingName = (item) => {
  for (let keys of array) {
    if (keys.name === item.name) {
      return true;
    }
  }
}

export default comparingId;