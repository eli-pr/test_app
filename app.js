/*
  This is a v0.0.1 degaas API
*/

const { spawn } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

var corsOptions = {
  // this will get moved to an environment/settings variable
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());

app.get('/', cors(corsOptions), function(req, res) {

  console.log(req.headers);

  const data = {
    jsonapi: {
      version: '1.0',
    },
    data: {
      status: 'OK',
    },
  };

  res.json(data);
});

app.put('/', cors(corsOptions), async (req, res) => {
  try {

    console.log(req.headers);

    var { body } = req;
    body.data.status = 'creating'
    res.json(body);

    if (body.data.s3_bucket_name === undefined) {
      throw Error('incoming JSON must have field \'s3_bucket_name\'');
    }

    if (body.data.environment === undefined) {
      throw Error('incoming JSON must have field \'environment\'');
    }

    const stacker = spawn('./bin/create_stack.sh', [`degaas-${body.data.environment}`, body.data.s3_bucket_name]);
    stacker.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    stacker.stderr.on('data', (data) => {
      console.log(`${data}`);
    });
    stacker.on('close', (code) => {
      console.log(`stacker exited with code ${code}`);
    });
  }
  catch(error) {
    console.log(error);
  }
});

app.delete('/', cors(corsOptions), function(req, res) {
  try {

    console.log(req.headers);
    
    var { body } = req;
    body.data.status = 'deleting';
    res.json(body);

    if (body.data.s3_bucket_name === undefined) {
      throw Error('incoming JSON must have field \'s3_bucket_name\'');
    }

    if (body.data.environment === undefined) {
      throw Error('incoming JSON must have field \'environment\'');
    }

    const stacker = spawn('./bin/delete_stack.sh', [`degaas-${body.data.environment}`, body.data.s3_bucket_name]);
    stacker.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    stacker.stderr.on('data', (data) => {
      console.log(`${data}`);
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
