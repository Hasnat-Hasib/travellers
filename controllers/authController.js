/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.sighnup = catchAsync(async (req, res, next) =>{
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            user: newUser
        }
    });
});