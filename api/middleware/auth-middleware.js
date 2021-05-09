const tokenUtil = require('../utils/token-util.js');
const cookieUtil = require('../utils/cookie-util.js');
const errorResp = require('../utils/error-response.js');

class AuthMiddleware {
  checkAuth(req, res, next) {
    const authToken = cookieUtil.getAuthToken(req);
    const errUnauthorized = errorResp.unauthorized('Unauthorized request');
    try {
      const tokenDetails = tokenUtil.verifyJwtToken(authToken);
      if (!tokenDetails) {
        throw errUnauthorized;
      }
      // auth details are present, add to "req" and continue
      req.user = {
        _id: tokenDetails._id,
        name: tokenDetails.name,
        email: tokenDetails.email
      };
      next();
    } catch(error) {
      next(errUnauthorized);
    }
  }
}

module.exports = new AuthMiddleware();