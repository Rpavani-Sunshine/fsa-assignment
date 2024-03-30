const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Dealership } = require('../Models/UserModel');
const { Deal } = require('../Models/DealerModel.js');
const userRouter = express.Router();

// Endpoint to add new user
userRouter.post('/usersignup', async (req, res) => {
    // find user existing 
    const userfound = await User.findOne({user_email: req.body.user_email});
    if(userfound){
        res.json({ error: "user already existing" });
    }else{
        const newUser = new User({
            user_email: req.body.user_email,
            user_location: req.body.user_location,
            user_info: {
                user_name: req.body.user_name,
                user_address: req.body.user_address
            },
            password: bcrypt.hashSync(req.body.password)
        });
        const user = await newUser.save();
    
        if (user) {
            const data = {
                _id: user._id,
                user_email: user.user_email,
                user_location: user.user_location,
                user_info: user.user_info,
                isAdmin: user.isAdmin,
            }
            res.json(data);
        }
        else {
            res.json({ error: "Error signing user" });
        }
    }

});
// endpoint to user login
userRouter.post('/usersignin', async (req, res) => {
    const userdata = await User.findOne({ user_email: req.body.user_email });
    if (userdata && bcrypt.compareSync(req.body.password, userdata.password)) {
        const token = jwt.sign({ _id: userdata._id }, process.env.JWT_SECRET);
        const data = {
            _id: userdata._id,
            user_email : userdata.user_email,
            user_location: userdata.user_location,
            user_info: userdata.user_info,
            token: token // Use the correctly generated token
        }
        res.json(data);
    } else {
        res.status(401).send({ message: 'Invalid email or password' });
    }
});

// endpoint to add dealer
userRouter.post('/dealersignup', async (req, res) => {
    // dealer is already registered
    const dealerFound = await Dealership.findOne({dealership_email: req.body.dealership_email})
    if(dealerFound) {
        res.json({ error: "Email already Registered" });
    }else{
        const newUser = new Dealership({
            dealership_email: req.body.dealership_email,
            dealership_name: req.body.dealership_name,
            dealership_location: req.body.dealership_location,
            dealership_info: {
                dealer_name: req.body.dealer_name,
                dealer_ph_no: req.body.dealer_ph_no,
                dealing_amount: req.body.dealing_amount,
            },
            password: bcrypt.hashSync(req.body.password)
        });
        const dealer = await newUser.save();
    
        if (dealer) {
            const data = {
                _id: dealer._id,
                dealership_email: dealer.dealership_email,
                dealership_location: dealer.dealership_location,
                dealership_info: dealer.dealership_info,
            }
            res.json(data);
        }
        else {
            res.json({ error: "Error signing user" });
        }
    }

});
// endpoint to user login
userRouter.post('/dealersignin', async (req, res) => {
    const dealerData = await Dealership.findOne({ dealership_email: req.body.dealership_email });
    if (dealerData && bcrypt.compareSync(req.body.password, dealerData.password)) {
        const token = jwt.sign({ _id: dealerData._id }, process.env.JWT_SECRET);
        const data = {
            _id: dealerData._id,
            dealership_email : dealerData.dealership_email,
            dealership_location: dealerData.dealership_location,
            dealership_info: dealerData.dealership_info,
            token: token // Use the correctly generated token
        }
        res.json(data);
    } else {
        res.status(401).send({ message: 'Invalid email or password' });
    }
});

userRouter.get('/dealerships/cars/:carId', async (req, res) => {
    try {
        const carId = req.params.carId;
        const dealerships = await Dealership.find({ 'cars': carId }).populate('cars');
        res.json(dealerships);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

userRouter.get('/users/:userId/vehicles', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate({
            path: 'vehicles',
            model: SoldVehicle,
            populate: {
                path: 'car_id',
                model: 'Car' // Assuming 'Car' model exists
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

userRouter.get('/deals/cars/:carId', async (req, res) => {
    try {
        const carId = req.params.carId;
        const deals = await Deal.find({ 'car_id': carId });
        res.json(deals);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
module.exports = userRouter;