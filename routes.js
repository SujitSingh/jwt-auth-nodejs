const express = require('express');
const routes = express.Router();

const authCtrls = require('./api/ctrls/auth-ctrls.js');

// /auth routes
routes.post('/auth/signup', authCtrls.signup);
routes.post('/auth/login', authCtrls.login);

module.exports = routes;