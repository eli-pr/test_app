/*
  This is a v0.0.1 degaas API
*/

const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  const data = {
    jsonapi: {
      version: '1.0',
    },
    data: {
      test: 'OK',
    },
  };

  res.json(data);
});

app.put('/', async (req, res) => {
  try {
    var { body } = req;
    body.data.status = 'creating'
    res.json(body);

    if (body.s3_bucket_name === undefined) {
      throw Error('incoming JSON must have field \'s3_bucket_name\'');
    }

    const stacker = spawn('./bin/create_stack.sh', ['eli-stack', body.s3_bucket_name]);
    stacker.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    stacker.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    stacker.on('close', (code) => {
      console.log(`stacker exited with code ${code}`);
    });
  }
  catch(error) {
    console.log(error);
  }
});

app.delete('/', function(req, res) {
  try {
    var { body } = req;
    body.data.status = 'deleting';
    res.json(body);

    const stacker = spawn('./bin/delete_stack.sh');
    stacker.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    stacker.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    stacker.on('close', (code) => {
      console.log(`stacker exited with code ${code}`);
    });
  }
  catch(error) {
    console.log(error);
  }
});

app.listen(11011);
