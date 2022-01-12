/* eslint-disable prettier/prettier */
const express = require ('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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
app.get('/', (req, res) => {
    res.send(" Hello from the server side.!!");
});
module.exports = app;