const express = require('express');
const authenticate = require('../Middlewares/authenticte');
const Car = require('../Models/CarModel');
const { Dealership } = require('../Models/UserModel');
const router = express.Router();


//  endpoint to view all cars for users and dealership
router.get('/cars', authenticate, (req, res) => {
    // Fetch all cars from the database
    Car.find({})
        .then(cars => {
            res.json(cars);
        })
        .catch(error => {
            console.error('Error fetching cars:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.get('/dealerships/:id/cars', authenticate, (req, res) => {
    const dealershipId = req.params.id;

    // Fetch dealership by ID
    Dealership.findById(dealershipId)
        .populate('cars')
        .exec()
        .then(dealership => {
            if (!dealership) {
                return res.status(404).json({ message: 'Dealership not found' });
            }
            res.json(dealership.cars);
        })
        .catch(error => {
            console.error('Error fetching cars:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Example endpoint to view all deals from a certain dealership
router.get('/dealerships/:id/deals', authenticate, (req, res) => {
    const dealershipId = req.params.id;

    // Fetch dealership by ID
    Dealership.findById(dealershipId)
        .populate('deals')
        .exec()
        .then(dealership => {
            if (!dealership) {
                return res.status(404).json({ message: 'Dealership not found' });
            }
            res.json(dealership.deals);
        })
        .catch(error => {
            console.error('Error fetching deals:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});
module.exports = router;