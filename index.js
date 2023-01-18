const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MysqlSachin@90',
  database: 'crud_blog',
});

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// making get API

app.get('/api/get', (req, res) => {
  const sqlGet = 'SELECT * FROM new_table';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// making post API

app.post('/api/add', (req, res) => {
  const { title, auther, description, location } = req.body;

  const sqlInsert =
    'INSERT INTO new_table (title,auther,description,location) VALUES (?,?,?,?)';

  db.query(
    sqlInsert,
    [title, auther, description, location],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    }
  );
});

// making delete API

app.delete('/api/remove/:id', (req, res) => {
  const { id } = req.params;

  const sqlRemove = 'DELETE FROM new_table WHERE id = ?';

  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
});

// Making put Api

app.put('/api/update/:id', (req, res) => {
  const { id } = req.params;

  const { title, auther, description, location } = req.body;

  const sqlUpdate =
    'UPDATE new_table SET title = ?, auther = ?, description = ?, location = ? WHERE id = ?';

  db.query(
    sqlUpdate,
    [title, auther, description, location, id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/', (req, res) => {
  res.send('hello ');
});

app.listen(8080, () => {
  console.log('Server is started on port 8080');
});
