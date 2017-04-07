const express = require('express');
const app = express();
const config = require('config/env');
const port = process.env.PORT || config.port;
const path = process.cwd() + '/client/';

app.use(express.static(path));

app.listen(port, function () {
  console.log('App listening on port ' + port)
});
