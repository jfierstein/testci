'use strict';

require('app-module-path').addPath(__dirname);

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const expressSession = require('express-session');
const forceHTTPS = require('node-force-secure-redirect');
const passport = require('lib/express/passportAuth');
const errorHandler = require('lib/express/errorHandler');
const client = require('lib/helpers/client');
const logger = require('lib/helpers/logger');
const mongo = require('lib/db/instance');

const config = require('config/env');

const app = express();
const port = config.port;
const secureEnvs = ['prod', 'staging'];

app.set('view engine', 'ejs');
app.set('trust proxy');

app.use(forceHTTPS(secureEnvs));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'testci',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(client.path));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', require('routes/api'));
app.use(require('routes/static'));

const initialActions = [mongo.init];

Promise.all(initialActions).then(results => {
    app.listen(port);
    logger.info('App running on port ' + port);
}).catch(err => {
    logger.warn( 'Failed to start app: ' + err);
  });