const User = require('../models/User');

const userController = {
    getAllUsers: async (req, res) => {
        try{
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try{
            const user = await User.findById(req.params.id);
            if(!user){
                return res.status(404).json("Wrong User ID");
            }
            res.status(200).json('Delete successfully');
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = userController;