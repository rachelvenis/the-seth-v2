const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require('./db/db');
db.init();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const port = process.argv[2] || 3100;
app.listen(port, () => {
  console.log(`running on: http://localhost:${port}/`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const restApiRoot = '/api';
app.use(restApiRoot, require('./routes/router'));
