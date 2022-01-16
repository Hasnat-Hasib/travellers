/* eslint-disable lines-between-class-members */
/* eslint-disable no-unused-expressions */
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
const catchAsync = require('./../utils/catchAsync');
const APIFatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');


//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

exports.getAllTour = catchAsync(async (req, res, next) => {

    //Sort
    // Limiting Fields
    //Pagination
    const features = new APIFatures(Tour.find(), req.query).filter().sort().paginate();
    const tours = await features.query;

        res.status(201).json({
        status: 'sccess',
        results: tours.length,
        data: {
            tours
        }
    });
});
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

exports.getTour = catchAsync(async (req, res, next) => {

    
            const tour = await Tour.findById(req.params.id);

            res.status(201).json({
            status: 'sccess',
            //results: tours.length,
            data: {
                tour
            }
        });

       
});

exports.updateTour = catchAsync(async (req, res, next) => {
    
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
});

exports.deleteTour = catchAsync(async (req, res, next) => {
    
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
      }
            res.status(204).json({
            status: 'sccess',
            //results: tours.length,
            data: null
        });    
});

exports.createTour = catchAsync(async (req, res, next) => {

        const newTour = await Tour.create(req.body);

        res.status(201).json({
        status: 'sccess',
        data: {
            tour: newTour
        }
    });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
        const stats = await Tour.aggregate([
            {
                $match : {ratingsAverage: {$gte: 4.5}}
            },
            {
                $group : {
                    _id: {$toUpper: '$difficulty'},
                    numTours: {$sum: 1},
                    numRatings: {$sum: '$ratingsQuantity'},
                    avgRating: { $avg: '$ratingsAverage'},
                    avgPrice: { $avg: '$price'},
                    minPrice: {$avg: '$price'},
                    maxPrice: {$avg: '$price'}
                }
            },
            {
                $sort: {avgPrice : 1}
            }
            // {
            //     $match: {_id: { $ne: 'EASY'}}
            // }
        ]);

        res.status(201).json({
            status: 'sccess',
            data: {
                stats
            }
        });    
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates:{
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: {$month: '$startDates'},
                    numTourStarts: {$sum: 1},
                    tours: {$push: '$name'}
                }
            },
            {
                $addFields: { month: '$_id'}
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: {numTourStarts: 1}
            }
            // {
            //     $limit: 15
            // }

        ]);
        res.status(200).json({
            status: 'sccess',
            data: {
                plan
            }
        }); 

});
