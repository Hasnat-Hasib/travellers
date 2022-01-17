/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
const jwt = require('jsonwebtoken'); 
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.sighnup = catchAsync(async (req, res, next) =>{
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(201).json({
        status: 'success',
        token,
        data:{
            user: newUser
        }
       
    });
    // next();
});