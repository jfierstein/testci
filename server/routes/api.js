'use strict';

let router = require('express').Router();

const buildInfo = require('buildInfo');
const config = require('config/env');

router.get('/buildInfo', function (req, res) {
  let info = Object.assign({}, buildInfo);
  info.env = config.env;
  res.json(info);
});

router.get('/ping', function (req, res) {
  res.sendStatus(200);
});

module.exports = router;