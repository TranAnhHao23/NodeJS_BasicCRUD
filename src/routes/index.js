const siteRoute = require('./site')
const userRoute = require('./user')
const authRoute = require('./auth')


function route(app) {

    app.use('/auth', authRoute)

    app.use('/users', userRoute);

    app.use('/', siteRoute);
}

module.exports = route;
