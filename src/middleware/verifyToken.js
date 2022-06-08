const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    console.log(token)

    if (!token) return res.status(401).send('Access Denied');

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err){
                console.log(err);
                res.status(401).send({message: 'Access Denied'});
            } else {
                next();
            }
        });

    }catch (err){
        return res.status(400).send('Invalid Token')
    }
}
