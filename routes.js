const express = require('express');
const routes = express.Router();

const authCtrls = require('./api/ctrls/auth-ctrls.js');
const userCtrls = require('./api/ctrls/user-ctrls.js');
const authMiddleware = require('./api/middleware/auth-middleware.js');

// /auth routes
routes.post('/auth/signup', authCtrls.signup);
routes.post('/auth/login', authCtrls.login);
routes.post('/auth/refresh-token', authCtrls.refreshToken);

routes.get('/user/:userId', authMiddleware.checkAuth, userCtrls.getUserDetails);

module.exports = routes;