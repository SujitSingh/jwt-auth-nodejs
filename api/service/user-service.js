const User = require('../models/user-model.js');
const errorResp = require('../utils/error-response.js');

class UserService {

  async getUserById(userId) {
    // get user details by id, without password
    return User.findById(userId, { password: 0 });
  }

  async getUserByEmail(userEmail) {
    // get user details by email, without password
    return User.findOne({ email: userEmail }, { password: 0 });
  }
}

module.exports = new UserService();