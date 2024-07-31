const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/movies', movieRoutes);

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
