const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');

const UserModel = require('../models/UserModel');
const secret = require('./keys').secretOrKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => passport.use(
  new Strategy(opts, (jwtPayload, done) => {
    UserModel.findById(jwtPayload.id)
      .then((user) => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch(err => done(err, false));
  }),
);
