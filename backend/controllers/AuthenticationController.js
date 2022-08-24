const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                const accessToken = jwt.sign({
                    id: user.id,
                    admin: user.admin
                },
                process.env.JWT_ACCESS_TOKEN,
                {
                    expiresIn: "30s"
                });
                const {password, ...rest} = user._doc;
                return res.status(200).json({...rest, accessToken});
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = AuthenticationController;