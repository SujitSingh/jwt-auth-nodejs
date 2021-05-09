const config = require('./config.js');
const tokenUtil = require('./token-util.js');

class CookieService {

  setAuthTokenCookie(res, token) {
    // create http only cookie with refresh token with expiry duration
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + config.TOKEN_EXPIRY * 1000)
    };
    res.cookie('Authorization', token, cookieOptions);
    return res;
  }

  addAuthTokenCookie(res, userObj) {
    // generate JWT token and add to head
    const jwtToken = tokenUtil.generateJwtToken(userObj);
    return this.setAuthTokenCookie(res, jwtToken);
  }

  getAuthToken(req) {
    return req.cookies && req.cookies.Authorization;
  }

}

module.exports = new CookieService();