const express = require('express');
const route = express.Router();

const authController = require('../app/controllers/AuthController')

route.post('/register', authController.register)

route.post('/login', authController.login)

route.post('/refreshToken', authController.refreshToken)

route.post('/logout', authController.logout)

module.exports = route;
