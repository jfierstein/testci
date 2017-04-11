'use strict';

const mongoose = require('mongoose');
const logger = require('lib/helpers/logger');
const config = require('config/env');

const db = mongoose.connection;

const init = new Promise(function (resolve, reject) {
    const uri = config.mongodb.uri;
    const options = { db: { safe: true } };
    mongoose.Promise = Promise;
    mongoose.set('debug', config.mongodb.debug || false);
    mongoose.connect(uri, options, function (err) {
        if (err) {
            logger.warn('Err connecting to mongodb (' + uri + ') ' + err);
            reject(err);
        } else {
            resolve(db);
        }
    });
});

db.on('error', function (err) {
    logger.warn('MongoDB error: ' + err);
});

db.on('open', function () {
    logger.info('Connection opened to MongoDB');
});

module.exports = { init };