/* eslint-disable prettier/prettier */
const mongoose = require ('mongoose');
const validator = require ('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Missing name']
    },
    email:{
        type: String,
        required: [true, 'Missing name'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email Missing']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Enter Password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm your password']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;