const User = require('../model/User')
const express = require('express')
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

    // [GET] / -> home page
    home(req, res, next) {
        User.find()
            .then((users) => res.render('home-page', {users : multipleMongooseToObject(users)}))
            .catch(next)
    }
}

module.exports = new SiteController()
