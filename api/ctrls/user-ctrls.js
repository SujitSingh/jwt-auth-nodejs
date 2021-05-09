const userService = require('../service/user-service.js');
const errorResp = require('../utils/error-response.js');

class UserCtrls {

  async getUserDetails(req, res, next) {
    try {
      let userId = req.params.userId;
      if (!userId) {
        throw errorResp.badRequest('User details missing');
      }
      const userDetails = await userService.getUserById(userId);
      res.send({
        user: userDetails && userDetails.toObject() || null
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new UserCtrls();