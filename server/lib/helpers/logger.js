'use strict';

const bunyan = require('bunyan');

const config = require('config/env');

const logger = bunyan.createLogger({name: 'testci-' + config.env});

module.exports = logger;