const fs = require('fs');

const file = './database.json';

const fileSystem = (method, item) => {
  if (method === 'read') {
    const fileObj = JSON.parse(fs.readFileSync(file));
    return fileObj;
  }
  if (method === 'write') {
    const jsonItem = JSON.stringify(item)
    const fileObj = fs.writeFileSync(file, jsonItem, 'utf8');
    return fileObj;
  }
  if (method === 'exists') {
    return fs.existsSync(file);
  }
}

module.exports = fileSystem;