const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');
// const { promisify } = require('util');




const EXPIRE_DAYS = 7;

const signToken = id => {
    return jwt.sign({ id }, keys.JWT_SECRET);
 }


exports.createUserToken = async(user, statusCode, req, res, returnMessage) => {
    const token = signToken(user._id);
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + EXPIRE_DAYS);

    res.cookie('jwt', token, {
        expires: expireDate,
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
        
    });
    // console.log('cookie: ' + res.cookie.jwt)

    //remove user password from output for security
    user.password = undefined;
    res.status(statusCode).json({
        success: true,
        message: returnMessage,
        token,
        userInfo: user
        });     
};


exports.verifyJWT = catchAsync(async(req, res, next) => {
    let user; 
    console.log('cookie: ' + req)  

    if (req) {
       const token = req;
    //    let decoded;

       try {
        const decoded = await jwt.verify(token.split('jwt=')[1], keys.JWT_SECRET);
        user = await User.findById(decoded.id);
        console.log('User: ' + user);
           
       } catch(error){
           return res.status(404).send({ success: false, message: "Invalid JWT"})
       }

      
    } 
    else {
       user = null;
    }

    if(user === null) {
        res.status(200).json({
            success: false,
            message: 'User logged in.',
            userInfo: null
        }); 

    }
    else {
        user.password = undefined;
        res.status(200).json({
            success: true,
            message: 'User currently logged in.',
            userInfo: user
        }); 
    }
});

