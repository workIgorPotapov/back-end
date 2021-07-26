import fs from 'fs';

const fileSystem = (method, file, item) => {
  if (method === 'read') {
    const fileObj = fs.readFileSync(file);
    return fileObj;
  }
  if (method === 'write') {
    const fileObj = fs.writeFileSync(file, item, 'utf8');
    return fileObj;
  }
}


export default fileSystem;