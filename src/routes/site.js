const express = require('express');
const route = express.Router();

const siteController = require('../app/controllers/SiteController')
const verifyToken = require('../middleware/verifyToken')

route.get('/',verifyToken, siteController.home);

module.exports = route;
