const authService = require('../service/auth-service.js');

class Auth {

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
      res.send(userObj);
    } catch(error) {
      next(error);
    }
  }
}

module.exports = new Auth();