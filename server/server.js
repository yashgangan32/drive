import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/routes.js';  // Import all routes


const app = express();

// Middlewares
app.use(cors({
    origin: 'https://drive-frontend-nine.vercel.app'
}));

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
