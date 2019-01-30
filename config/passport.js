const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UserModel = require('../models/UserModel');
const { secretOrKey } = require('./keys');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
};

module.exports = passport =>
  passport.use(
    new jwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.id);
        if (user) return done(null, user);

        return done(null, false);

      } catch (err) {
        return done(err, false);
      } 
    })
  );
