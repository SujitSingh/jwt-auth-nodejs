const authService = require('../service/auth-service.js');
const tokenUtil = require('../utils/token-util.js');
const cookieUtil = require('../utils/cookie-util.js');

class AuthCtrls {

  async signup(req, res, next) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    try {
      const userObj = await authService.registerUser(user);
      return res.send({
        message: 'Registration successful',
        user: userObj
      });
    } catch(error) {
      next(error);
    }
  }

  async login(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    try {
      const userObj = await authService.login(user);
      // generate auth tokens, add to response and head
      const tokens = tokenUtil.generateTokens(userObj);
      res = cookieUtil.setAuthTokenCookie(res, tokens.token);
      res.send({
        user: userObj,
        token: tokens.token,
        refreshToken: tokens.refreshToken
      });
    } catch(error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    const currentRefreshToken = req.body.refreshToken;
    try {
      const tokenDetail = await authService.refreshToken(currentRefreshToken);
      // generate auth tokens, add to response and head
      const tokens = tokenUtil.generateTokens(tokenDetail);
      res = cookieUtil.setAuthTokenCookie(res, tokens.token);
      res.send({
        token: tokens.token,
        refreshToken: tokens.refreshToken
      });
    } catch(error) {
      next(error);
    }
  }
}

module.exports = new AuthCtrls();