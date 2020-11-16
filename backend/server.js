import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// initializing dotenv
dotenv.config();

// initializing mongodb
connectDB();

// initializing express
const app = express();

// @desc allow to accept json data from the body "req.body"
app.use( express.json() );

app.get( '/', ( ( req, res ) => {
  res.send( 'API is running....' );
} ) );

app.use( '/api/products', productRoutes );
app.use( '/api/users', userRoutes );
app.use( '/api/orders', orderRoutes );

// @desc paypal config
app.get( '/api/config/paypal', ( req, res ) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
} );

// @desc Custom error handling
app.use( notFound );
app.use( errorHandler );

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${ process.env.NODE_ENV } on port ${ PORT }`.brightYellow )
);
