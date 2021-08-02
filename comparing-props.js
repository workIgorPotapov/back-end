const fileSystem = require('./file-system');

const comparingId = (id) => {
  const array = fileSystem('read');
  if (array.find(item => item.uuid === id)) {
    return true;
  }else{
    return false;
  }
}

const comparingName = (item) => {
  const array = fileSystem('read');
  if (array.find(task => task.name === item.name)) {
    return true;
  }else{
    return false;
  }
}

exports.comparingId = comparingId;
exports.comparingName = comparingName;