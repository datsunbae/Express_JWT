const authenticationRouter = require('./authentication');
const userRouter = require('./user');

function route(app) {
    app.use('/auth', authenticationRouter);
    app.use('/user', userRouter);
}

module.exports = route;