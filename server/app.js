'use strict';

require('app-module-path').addPath(__dirname);

const express = require('express');
const app = express();
const config = require('config/env');
const port = config.port;

const client = require('lib/helpers/client');
const logger = require('lib/helpers/logger');
const mongo = require('lib/db/instance');
const errorHandler = require('lib/express/errorHandler');

app.use(errorHandler);
//app.use(express.static(client.path));

app.use('/api', require('routes/api'));
app.use(require('routes/static'));

const initialActions = [mongo.init];

Promise.all(initialActions)
  .then((results) => {
    app.listen(port);
    logger.info('App running on port ' + port);
  })
  .catch((err) => {
    logger.warn( 'Failed to start app: ' + err);
  });