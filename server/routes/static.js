'use strict';

let router = require('express').Router();

const client = require('lib/helpers/client');

router.get('/', function (req, res) {
    res.sendStatus(200);
    // const path = client.htmlPath('index');
    // res.sendFile(path);
});

module.exports = router;