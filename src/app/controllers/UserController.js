const User = require('../model/User')
const express = require('express')
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose')


class UserController {

    // [GET] /users/createDashboard
    createDashboard(req, res, next) {
        res.render('create')
    }

    // [POST] /users/create
    create(req, res, next) {
        const user = new User(req.body);
        user.save()
            .then(() => res.redirect('/'))
            .catch(next)
    }

    // [GET] /users/edit/:id
    editDashboard(req, res, next) {
        User.findById(req.params.id)
            .then(user => res.render('edit', {user: mongooseToObject(user)}))
            .catch(next)
    }

    //[PUT] /users/update/:id?_method=PUT
    update(req, res, next) {
        User.updateOne({_id:req.params.id}, req.body)
            .then(() => res.redirect('/'))
            .catch(next)
    }

    // [DELETE] /users/delete/:id
    delete(req, res, next) {
        User.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/'))
            .catch(next)
    }
}

module.exports = new UserController();
