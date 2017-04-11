'use strict';

let router = require('express').Router();

const dockerApi = require('services/docker/api');

const buildInfo = require('buildInfo');
const config = require('config/env');

const passport = require('passport');

const authReq = require('lib/express/authReq');

const User = require('models/user');

router.get('/build-info', function (req, res) {
  let info = Object.assign({}, buildInfo);
  info.Environment = config.env;
  res.json(info);
});

router.get('/ping', function (req, res) {
  res.sendStatus(200);
});


/*
/ AWS
*/

/*
/ Docker
*/

router.get('/docker/tagged-images',authReq , function (req, res) {
  const action = dockerApi.getTaggedImages();
  res.promise(action);
});

/*
/ Deployments
*/
router.post('/deployments/add', function (req, res) {
  const { name } = req.body;
  let action = User.addDeploymentToUser({ googleId: '111321919165682944453' }, name);
  res.promise(action);
});

/*
/ Authorization / OAuth
*/

router.get('/auth/badlogin', function (req, res) {
  res.sendStatus(401);
});

router.get('/auth/status', function (req, res) {
  if(req.user) res.promise(User.findOne({ googleId: req.user.googleId }));  
  else res.sendStatus(401);
});

router.get('/auth/google', passport.authenticate('google', { scope: 'openid profile' }));

router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/api/auth/badlogin' }));

router.get('/auth/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;