import fileSystem from './file-system.js';

const file = fileSystem('read');
const array = JSON.parse(file);

const comparingId = (id) => {
  for (let keys of array) {
    if (keys.id === id) {
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