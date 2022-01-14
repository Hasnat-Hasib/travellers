/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Missing Tour name'],
        unique: true,
        trim: true

    },
    duration:{
        type: Number,
        required: [true, "Missing tour duration"]
    },
    difficulty:{
        type: String,
        required: [true, "Missing tour difficulty"]
    },
    maxGroupSize:{
        type: Number,
        required: [true, "Missing tour Max Group Size"]
    },
    
    ratingsAverage:{
        type: Number,
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: [true, "Missing tour price"]
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "Missing tour summary"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'Cover Image Missing']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]


});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;