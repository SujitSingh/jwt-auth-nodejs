const bcrypt = require('bcrypt');
const User = require('../models/user-model.js');

class Auth {
  constructor() { }

  async signup(req, res, next) {
    const name = req.body.name,
          email = req.body.email,
          password = req.body.password;
    if (!name || !email || !password) {
      const error = new Error('Required fields missing');
      error.statusCode = 400;
      return next(error);
    }
    try {
      const userInDb = await User.findOne({ email });
      if (userInDb) {
        // email already exists
        const error = new Error('User already registered');
        error.statusCode = 400;
        return next(error);
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
      res.status().send({
        message: 'Required fields missing'
      });
    }
  }
}

module.exports = new Auth();