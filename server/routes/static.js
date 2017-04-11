'use strict';

let router = require('express').Router();

const client = require('lib/helpers/client');

router.get('/', function (req, res) {
    const path = client.htmlPath('index');
    res.sendFile(path);
});

module.exports = router;