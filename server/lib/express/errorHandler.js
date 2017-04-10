'use strict';

module.exports = (req, res, next) => {
  res.promise = (promise) => {
    promise
      .then(result => {
        if (typeof result === 'object') {
          res.json(result);
        } else {
          res.send(result);
        }
      })
      .catch(err => {
        if (err && err.isBoom) {         
          return res.status(err.output.payload.statusCode).json(err.output.payload);
        } else if (err instanceof Error) {
          res.status(500);
          res.json({ status: 500, message: err.message || err.toString() });
        } else if (typeof err === 'object') {
          res.status(err.status || 500);
          res.json(err);
        } else {
          res.status(500);
          res.json({ status: 500, message: err });
        }
      });
  };
  next();
};