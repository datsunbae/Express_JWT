const User = require('../models/User');
const bcrypt = require('bcrypt');

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
                res.status(404).json('Wrong username!');
                return;
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                res.status(404).json('Wrong password!');
                return;
            }

            if(user && validPassword){
                res.status(200).json(user);
                return;
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = AuthenticationController;