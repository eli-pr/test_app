/*
  This is a v0.0.1 degaas API
*/

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

var data = {
  jsonapi: {
    version: '1.0',
  },
  data: {
    test: 'OK',
  },
};

app.get('/', function(req, res) {
  res.json(data);
});

app.put('/', async (req, res) => {
  try {
    data = req.body;
    res.json(data);
  }
  catch(error) {
    console.log(error);
  }
});

app.listen(11011);