const express = require('express');
const route = express.Router();

const userController = require('../app/controllers/UserController');

route.get('/createDashboard',userController.createDashboard);

route.post('/create', userController.create);

route.get('/edit/:id', userController.editDashboard);

route.put('/update/:id', userController.update);

route.get('/delete/:id', userController.delete);

module.exports = route
