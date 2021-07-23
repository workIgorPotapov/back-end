import express, { json } from 'express';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const __dirname = path.resolve();
const PORT = 5000;


if (!fs.existsSync('database.json')) {
  fs.writeFileSync('database.json', JSON.stringify([]));
  // const file = fs.readFileSync('database.json', 'utf8');
  // if (file.length === 0) {
  //  fs.writeFileSync('database.json', JSON.stringify([]), 'utf8');
//   }
}

const file = fs.readFileSync('database.json');
const array = JSON.parse(file);
const done = array.filter((item) => { return item.done !== false });
const undone = array.filter((item) => { return item.done !== true });

const allAsc = [...array].sort((a, b) => {
  if (a.time < b.time) {
    return -1;
  } else if (a.time > b.time) {
    return 1;
  } else {
    return 0;
  }
});

const allDesc = [...array].sort((a, b) => {
  if (a.time > b.time) {
    return -1;
  } else if (a.time < b.time) {
    return 1;
  } else {
    return 0;
  }
});

const doneAsc = [...done].sort((a, b) => {
  if (a.time < b.time) {
    return -1;
  } else if (a.time > b.time) {
    return 1;
  } else {
    return 0;
  }
});

const doneDesc = [...done].sort((a, b) => {
  if (a.time > b.time) {
    return -1;
  } else if (a.time < b.time) {
    return 1;
  } else {
    return 0;
  }
});

const undoneAsc = [...undone].sort((a, b) => {
  if (a.time < b.time) {
    return -1;
  } else if (a.time > b.time) {
    return 1;
  } else {
    return 0;
  }
});

const undoneDesc = [...undone].sort((a, b) => {
  if (a.time > b.time) {
    return -1;
  } else if (a.time < b.time) {
    return 1;
  } else {
    return 0;
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`)
});

app.post('/', (req, res) => {
  const file = fs.readFileSync('database.json');
  const array = JSON.parse(file);
  const item = req.body;
  item.id = uuidv4();
  item.done = false;
  item.time = new Date();
  array.push(item);
  res.status(201).json(item);
  const jsonItem = JSON.stringify(array);
  fs.writeFileSync('database.json', jsonItem, 'utf8');
});

app.delete('/:id', (req, res) => {
  const {id} = req.params;
  const file = fs.readFileSync('database.json');
  const array = JSON.parse(file);
  const removedArray = array.filter((item) => item.id !== id);
  const jsonItem = JSON.stringify(removedArray);
  fs.writeFileSync('database.json', jsonItem, 'utf8');
  res.status(200);
  console.log(id)
  console.log(removedArray)
});

app.patch('/:id', (req, res) => {
  const {id} = req.params;
  const file = fs.readFileSync('database.json');
  const array = JSON.parse(file);
  const changedItem = req.body;
  const changedArray = array.map((item) => {
    if (item.id === id) {
      for (let key in changedItem) {
        item[key] = changedItem[key];
        return item;
      }
    } else {
      return item;
    }
  });
  const jsonItem = JSON.stringify(changedArray);
  fs.writeFileSync('database.json', jsonItem, 'utf8');
  res.status(200);
  console.log(changedArray)
});

app.get('/', (req, res) => {

  const {filterBy, order} = req.query;
  if (order === 'asc' && !filterBy) {
    
    res.status(200);
    const jsonItem = JSON.stringify(allAsc);
    res.send(jsonItem);
  }

  if (order === 'desc' && !filterBy) {
    
    res.status(200);
    const jsonItem = JSON.stringify(allDesc);
    res.send(jsonItem);
  }

  if (order === 'asc' && filterBy === 'done') {
    
    res.status(200);
    const jsonItem = JSON.stringify(doneAsc);
    res.send(jsonItem);
  }

  if (order === 'desc' && filterBy === 'done') {
    
    res.status(200);
    const jsonItem = JSON.stringify(doneDesc);
    res.send(jsonItem);
  }
  
  if (order === 'asc' && filterBy === 'undone') {
    
    res.status(200);
    const jsonItem = JSON.stringify(undoneAsc);
    res.send(jsonItem);
  }

  if (order === 'desc' && filterBy === 'undone') {
    
    res.status(200);
    const jsonItem = JSON.stringify(undoneDesc);
    res.send(jsonItem);
  }

});