const bcrypt = require('bcrypt');
const User = require('../models/user-model.js');
const errorResp = require('../utils/error-response.js');

class Auth {
  constructor() { }

  async signup(req, res, next) {
    const name = req.body.name,
          email = req.body.email,
          password = req.body.password;
    if (!name || !email || !password) {
      return next(errorResp.badRequest('Required fields missing'));
    }
    try {
      const userInDb = await User.findOne({ email });
      if (userInDb) {
        // email already exists
        return next(errorResp.badRequest('User already registered'));
      }
      // hash user password
      const hash = await bcrypt.hash(password, 10);
      // save user info
      const user = new User({
        name, email, password: hash
      });
      const createdUser = await user.save();
      const userObj = createdUser.toObject();
      delete userObj.password;

      return res.send({
        message: 'Registration successful',
        user: {
          ...userObj
        }
      });
    } catch(error) {
      next(error);
    }
  }

  async login(req, res, next) {
    const email = req.body.email,
          password = req.body.password;
    if (!email || !password) {
      return next(errorResp.badRequest('Required fields missing'));
    }
    try {
      const credentialsError = errorResp.unauthorized('Incorrect credentials');
      // find user in db
      const user = await User.findOne({ email });
      if (!user) {
        return next(credentialsError);
      }
      // compare password
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        // credentials miss-match
        return next(credentialsError);
      }
      // return user details for login
      const userObj = user.toObject();
      delete userObj.password;
      res.send({
        ...userObj
      });
    } catch(error) {
      next(error);
    }
  }
}

module.exports = new Auth();