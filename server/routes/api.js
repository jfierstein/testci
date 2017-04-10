'use strict';

let router = require('express').Router();

const dockerApi = require('services/docker/api');

const buildInfo = require('buildInfo');
const config = require('config/env');

router.get('/build-info', function (req, res) {
  let info = Object.assign({}, buildInfo);
  info.Environment = config.env;
  res.json(info);
});

router.get('/docker/tagged-images', function (req, res) {
  const action = dockerApi.getTaggedImages();
  res.promise(action);
});

router.get('/ping', function (req, res) {
  res.sendStatus(200);
});

module.exports = router;