const express = require('express');
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose');
const User = require('../model/User')
const dotenv = require('dotenv')

dotenv.config()

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {registerValidator} = require('../validator/auth')

let refreshTokens = []

class AuthController {
    async register(req, res, next) {
        const {error} = registerValidator(req.body);
        if (error) return res.status(422).send(error.details[0].message);

        // const salt = await bcrypt.genSalt(10);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword

        const user = new User(req.body);
        user.save()
            .then(() => res.send(user))
            .catch(next)
    }

    async login(req, res, next) {
        const user = await User.findOne({name: req.body.name});
        if (!user || !bcrypt.compareSync(req.body.password, user.password)){
            res.send('Wrong Name or Id')
        } else {
            const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET, { expiresIn: '30s'});
            const tokenRefresh = jwt.sign({_id : user._id}, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(tokenRefresh);
            return res.status(200).send({
                token,
                tokenRefresh,
                user,
                message: 'Login success'
            })

        }
    }

    refreshToken(req, res, next){
        console.log(refreshTokens)
        const refreshToken = req.body.token;
        if (!refreshToken) res.sendStatus(400);
        if (!refreshTokens.includes(refreshToken)) res.sendStatus(401);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            console.log(err, data);
            if (err) res.sendStatus(403);
            const accessToken = jwt.sign({ name: data.name }, process.env.TOKEN_SECRET, {expiresIn: '30s',});
            res.json({ accessToken });
        });
    }

    logout(req, res, next){
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
        res.send(refreshTokens)
    }
}

module.exports = new AuthController();
