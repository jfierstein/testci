'use strict';

const http = require('lib/helpers/http');;
const template = require('config/env').docker;

const provide = {};

provide.getTaggedImages = () => {
  return new Promise(function(resolve, reject) {
    const options = Object.assign({}, template);
    options.url += 'repositories/jfierstein/testci/tags';
    http.makeRequest(options)
      .then(data => resolve(data.body))
    .catch(reject);
  });
};

module.exports = provide;