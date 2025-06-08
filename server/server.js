import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connect from './database/conn.js';
import posterRoutes from './routers/posterRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('tiny'))
app.use(express.json());
// Routers


app.use('/api/posters', posterRoutes);

console.log('Env Port',process.env.PORT);

// Server and Database Connection
connect().then(() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}).catch((error) => {
    console.error('Error connecting to database:', error);
})