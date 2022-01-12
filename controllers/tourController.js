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
        const tours = await Tour.find();

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
            message: 'Invalid data sent'
        });
    }
    
};
