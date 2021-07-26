import fs from 'fs';

const file = 'database.json';

const fileSystem = (method, item) => {
  if (method === 'read') {
    const fileObj = fs.readFileSync(file);
    return fileObj;
  }
  if (method === 'write') {
    const fileObj = fs.writeFileSync(file, item, 'utf8');
    return fileObj;
  }
  if (method === 'exists') {
    return fs.existsSync(file);
  }
}

export default fileSystem;