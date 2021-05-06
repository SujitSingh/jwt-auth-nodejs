const jwt = require('jsonwebtoken');
const config = require('./config.js');

class JwtService {

  generateJwtToken(user) {
    return jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      config.TOKEN_SECRET,
      { expiresIn: config.TOKEN_EXPIRY }
    );
  }

  verifyJwtToken(token) {
    return jwt.verify(token, config.TOKEN_SECRET);
  }

  generateRefreshJwtToken(user) {
    return jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: config.REFRESH_TOKEN_EXPIRY }
    );
  }

  verifyRefreshJwtToken(token) {
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
  }

}

module.exports = new JwtService();