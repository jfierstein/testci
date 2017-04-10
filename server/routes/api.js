'use strict';

let router = require('express').Router();

const dockerApi = require('services/docker/api');

const buildInfo = require('buildInfo');
const config = require('config/env');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('models/user');

passport.use(new GoogleStrategy({
    clientID: '245987662231-ic1ndvqfh4rsvk72dlfa8e7isqqu1pl1.apps.googleusercontent.com',
    clientSecret: 'Lz35hVRYf89Sk_68Rh98vez4',
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));


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

router.get('/badlogin', function (req, res) {
  res.sendStatus(401);
});

router.get('/auth/google',
  passport.authenticate('google', { scope: 'openid profile' }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/badlogin' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;