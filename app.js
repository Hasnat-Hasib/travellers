/* eslint-disable prettier/prettier */
const express = require ('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');



const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};


// app.get('/api/v1/tours', getAllTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.post('/api/v1/tours', createTour);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
 
});

app.use(globalErrorHandler);
module.exports = app;