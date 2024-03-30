// Import required modules
const express = require('express');
// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const userRouter = require('./Routes/UserRoute');
const router = require('./Routes/CommonRoute');
const dealerRouter = require('./Routes/DealerRoutes');

require('dotenv').config();


// Initialize express app
const app = express();
app.use(express.json());

// Routers
app.use('/api/user', userRouter)
app.use('/api', router)
app.use('/api/dealerships', dealerRouter)

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => {
//         console.log('Connected to MongoDB');
//     });
const client = new MongoClient(process.env.MONGODB_URI);

// Start the server
const PORT = process.env.PORT || 4001;
client.connect().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });