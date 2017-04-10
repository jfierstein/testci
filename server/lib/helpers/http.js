'use strict';

const request = require('request');

/* Sample Options Layout
 * Recommended to use objects from config
 * and appending/adding the url & body keys
 */
// var options = {
//   url,
//   method,
//   headers,
//   body,
// };

const makeRequest = (options) => {
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (error) return reject({error});
      if (response.statusCode >= 400) return reject(generateError(options.url, response));
      if (response.headers['content-type'] &&
          response.headers['content-type'].indexOf('json') != -1) {
        response.body = JSON.parse(response.body);
      }
      resolve(response);
    });
  });
};

const generateError = (url, response) => {
  return `Call to external service (${url}) failed with ${response.statusCode}. Response body: ${response.body}`;
};

module.exports = {
  makeRequest
};