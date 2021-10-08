/* eslint-disable */
const User = require('./userModels');
const { sendEmail } = require('../utils/email');
require('dotenv').config({ path: './config.env' });

const jwt = require('jsonwebtoken');
//const expressJWT = require('express-jwt');


exports.signup = async (req, res) =>{
    const user = new User(req.body);
    let token = jwt.sign({_id: user._id},process.env.JWT_ACC_ACTIVATE, {expiresIn: process.env.JWT_EXPIRES_IN});
    user.token = token;
    user.save((err, user) =>{
        if(err){    //
            return res.json({
                message:"unable to add user"
            })
        }
        return res.json({
            message: "Success",
            user
        })
    })
    let { email } = req.body;
    let code = Math.floor(100000+Math.random() * 900000);
   // let token = jwt.sign({_id: user._id},process.env.JWT_ACC_ACTIVATE, {expiresIn: process.env.JWT_EXPIRES_IN});
    const url = `${req.protocol}://${req.get('host')}/api/signupVerification/${token}`;
    const sendtoken = await sendEmail(email, url, code);

    
}

exports.login =async (req, res) =>{
    const { email, password} = req.body;  
    User.findOne({email}, (err,user) =>{
        if(err || !user){             //!user means no email is there
            return res.status(400).json({
                message: "email not found"
            })
        }

        
   
        //Authenticate the email 
        if(!user.authenticate(password)){
            return res.status(400).json({
                message: "email and password doesn't match"
            })
        }

        //create Token
        const token = jwt.sign({_id: user._id},process.env.JWT_ACC_ACTIVATE, {expiresIn: process.env.JWT_EXPIRES_IN});

        //put token in cookies
        res.cookie('token', token)

        //send response
        const {_id, name, email} = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        })
    })
}

exports.welcome = (req, res) => {
    res.status(200).json({
        message: "welcome"
    });
}
exports.signOut = (req, res) =>{
    res.clearCookie('token');
    return res.json({
        message: "user sign out succesfully"
    })
}
