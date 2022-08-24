const jwt = require('jsonwebtoken');

const middleWareController = {
    verifyToken(req, res, next) {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
                if(err){
                    return res.status(403).json('Token is not valid');
                }
                req.user = user;
                next();
            })
        }
        else{
            return res.status(401).json('You\'re not authorized')
        }  
    }
}

module.exports = middleWareController;