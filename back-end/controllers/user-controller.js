const User = require('../models/user');

const signUp = async (req, res, next) => {
    const existingUser = await User.findOne({ username: req.body.username }).exec();

    if (existingUser){
        return res.json({error : 'Existing User'});
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    const result = await newUser.save();

    res.json({id : result.id, username: result.username, success: true});
};

const login = async (req, res, next) => {
    const existingUser = await User.findOne({ username: req.body.username }).exec();

    if (!existingUser || existingUser.password != req.body.password){
        return res.json({error : 'Invalid Username/Password'});
    }

    res.json({id : existingUser.id, username: existingUser.username, success: true});
};

const searchUser = async (req, res, next) =>{

    const existingUser = await User.findOne({ username: req.body.username }).exec();

    if (!existingUser){
        return res.json({error : 'User does not exist'});
    }

    res.json({id: existingUser.id, success: true});
}

exports.signUp = signUp;
exports.login = login;
exports.searchUser = searchUser;