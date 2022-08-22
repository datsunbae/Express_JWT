const authenticationRouter = require('./authentication')

function route(app) {
    app.use('/auth', authenticationRouter);
}

module.exports = route;