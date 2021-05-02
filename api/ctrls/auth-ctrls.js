class Auth {
  constructor() { }

  signup(req, res, next) {
    const name = req.body.name,
          email = req.body.email,
          password = req.body.password;
    if (!name || !email || !password) {
      res.status().send({
        message: 'Required fields missing'
      });
    }
  }
  login(req, res, next) {
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