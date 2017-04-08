'use strict';

require('app-module-path').addPath(__dirname);

const express = require('express');
const app = express();
const config = require('config/env');
const port = config.port;

const client = require('lib/helpers/client');

app.use(express.static(client.path));

app.use('/api', require('routes/api'));
app.use(require('routes/static'));

app.listen(port, function () {
  console.log('App listening on port ' + port)
});
