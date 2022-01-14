/* eslint-disable import/no-useless-path-segments */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
const fs = require ('fs');
const Tour = require("./../models/tourModel");

//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTour = async (req, res) => {

    
    try{
    const queryObj = {...req.query};
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt');
    }

    if(req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    }else{
        query = query.select('-__v');
    }
    

    const tours = await query;

        

        res.status(201).json({
        status: 'sccess',
        results: tours.length,
        data: {
            tours
        }
    });

    }catch (err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
// exports.checkId = (req, res, next, val) => {
//     console.log('Tour id is... ${ val}');
//     if(req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status : 'fail',
//             message: ' Invalid Id'
//         });
//     }
//     next();
// }

// exports.checkBody = (req, res, next) => {
//     if(!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         })
//     }

//     next();
// }

exports.getTour = async (req, res) => {

    try{
            const tour = await Tour.findById(req.params.id);

            res.status(201).json({
            status: 'sccess',
            //results: tours.length,
            data: {
                tour
            }
        });

        }catch (err){
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }
};

exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

            res.status(201).json({
            status: 'sccess',
            //results: tours.length,
            data: {
                tour
            }
        });

    }catch (err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
        
};
exports.deleteTour = async (req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id);

            res.status(204).json({
            status: 'sccess',
            //results: tours.length,
            data: null
        });

    }catch (err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createTour = async (req, res) => {

    try{
        const newTour = Tour.create(req.body);

        res.status(201).json({
        status: 'sccess',
        data: {
            tour: newTour
        }
    });

    }catch (err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
    
};
