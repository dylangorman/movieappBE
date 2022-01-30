const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const { User } = require("../models/user");
//keys that exist within passportlocal, you need to call the below in their specific name
const mappings = { usernameField: "name", passwordField: "password" };

//func which hashed password and creates user object
const register = async (name, password, next) => {
  try {
    if (!name || !password) {
      throw new Error("User info is missing");
    }
    //creates salt to hash password
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    //password now hashed - return garbled string
    const passwordHash = await bcrypt.hash(password, salt);
    try {
      //create user
      const user = await User.create({
        name: name,
        passwordHash: passwordHash,
      });
      //once create, next() passes to next function in the chain -
      // register from routes/user.js
      next(null, user);
    } catch (error) {
      next(error, {});
    }
  } catch (error) {
    next(error);
  }
};
const login = async (name, password, next) => {
  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      return next(null, null, { msg: "Incorrect name" });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    return match
      ? next(null, user)
      : next(null, null, { msg: "Incorrect password" });
  } catch (error) {
    next(error);
  }
};
//callback function use below, it gives a token
const verify = (token, next) => {
  try {
    next(null, token.user);
  } catch (error) {
    next(error);
  }
};
//strategy, a passport method, is a constructor
//it takes secret key from ENV (notej naming convention)
//it take the data from URL and compares the secret key and the jwt encoding
const verifyStrategy = new JWTStrategy(
  {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
  },
  verify
);

const registerStrategy = new LocalStrategy(mappings, register);
const loginStrategy = new LocalStrategy(mappings, login);

module.exports = {
  registerStrategy,
  loginStrategy,
  verifyStrategy,
};
