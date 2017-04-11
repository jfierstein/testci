const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_SECRET,
    callbackURL: process.env.SITE_URL + '/api/auth/google/callback'
  }, 
  (token, tokenSecret, profile, done) => {
    const googleProfile = { googleId: profile.id }
    User.findOrCreate(googleProfile, googleProfile).then((res, err) => {
        return done(null, res);
    }).catch(err => { return done(err); });
}));

passport.serializeUser(function(user, done) {
  done(null, user.googleId);
});

passport.deserializeUser(function(googleId, done) {
  User.findOne({ googleId }, function(err, user) {
    if(user) done(err, user.toObject());
    else done(err);
  });
});

module.exports = passport;