const siteRoute = require('./site')
const userRoute = require('./user')


function route(app) {

    app.use('/users', userRoute);

    app.use('/', siteRoute);
}

module.exports = route;
