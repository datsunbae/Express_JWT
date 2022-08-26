const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const AuthenticationController = {
    registerUser: async (req, res) => {
        try {
            //Hash password
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(req.body.password, salt);

            //Create user
            const newUser = await new User({
                email: req.body.email,
                username: req.body.username,
                password: hash
            });

            const user = await newUser.save();
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({ username: req.body.username });
            if(!user){
                return res.status(404).json('Wrong username!');
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                return res.status(404).json('Wrong password!');
            }

            if(user && validPassword){
                const accessToken = AuthenticationController.generateAccessToken(user);
                const refreshToken = AuthenticationController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                console.log("Login: ",refreshTokens);
   
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    scure: false
                });
                const {password, ...rest} = user._doc;
                return res.status(200).json({...rest, accessToken});
            }
        }catch(err){
            res.status(500).json(err);
        }
    },
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn: "1m"
        })
    },
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn: "200d"
        })
    },
    refreshToken: async (req, res) => {
        //Get refresh token
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json('You\'re not authenticated')
        }
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json('Refresh token is not valid');
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if(err){
                return res.status(403).json('Token is not valid');
            }
            //Remove old refresh token
            refreshTokens = refreshTokens.filter(token => token !== refreshToken)
            console.log("FILTER TOKEN", refreshTokens);
            const newAccessToken = AuthenticationController.generateAccessToken(user);
            const newRefreshToken = AuthenticationController.generateRefreshToken(user);
            //Push new refresh token
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                scure: false
            });
            res.status(200).json({newAccessToken});
        })
    }
}

module.exports = AuthenticationController;