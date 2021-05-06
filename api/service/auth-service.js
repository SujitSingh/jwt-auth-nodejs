const bcrypt = require('bcrypt');
const User = require('../models/user-model.js');
const errorResp = require('../utils/error-response.js');
const tokenUtil = require('../utils/token-util.js');

class AuthService {

  async registerUser(user = {}) {
    if (!user.name || !user.email || !user.password) {
      throw errorResp.badRequest('Required fields missing');
    }
    const userInDb = await User.findOne({ email: user.email });
    if (userInDb) {
      // email already exists
      throw errorResp.badRequest('User already registered');
    }
    // hash user password
    const hash = await bcrypt.hash(user.password, 10);
    // save user info
    const newUser = new User({
      name: user.name, email: user.email, password: hash
    });
    const createdUser = await newUser.save();
    const userObj = createdUser.toObject();
    delete userObj.password;
    return userObj;
  }

  async login(user = {}) {
    if (!user.email || !user.password) {
      throw errorResp.badRequest('Required fields missing');
    }
    const credentialsError = errorResp.unauthorized('Incorrect credentials');
    // find user in db
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      throw credentialsError;
    }
    // compare password
    const result = await bcrypt.compare(user.password, existingUser.password);
    if (!result) {
      // credentials miss-match
      throw credentialsError;
    }
    // return user details for login
    const userObj = existingUser.toObject();
    delete userObj.password;
    return userObj;
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw errorResp.badRequest('Missing refresh token');
    }
    const tokenDetails = tokenUtil.verifyRefreshJwtToken(refreshToken);
    if (!tokenDetails) {
      throw errorResp.unauthorized('Token expired');
    }
    return tokenDetails;
  }
}

module.exports = new AuthService();