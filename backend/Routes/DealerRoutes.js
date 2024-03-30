const express = require('express');
const { Dealership } = require('../Models/UserModel');
const { Deal } = require('../Models/DealerModel.js');
const Car = require('../Models/CarModel.js');
const dealerRouter = express.Router();

dealerRouter.post('/:dealershipId/cars', async (req, res) => {
    const { type, name, model, info } = req.body;

    // Create a new car object
    const newCar = new Car({
        type: req.body.type,
        name: req.body.name,
        model: req.body.model,
        car_info: {
            price: req.body.price
        }
    });

    // Save the new car to the database
    newCar.save()
        .then(savedCar => {
            res.status(201).json(savedCar);
        })
        .catch(error => {
            console.error('Error adding new vehicle:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// POST /dealerships/:dealershipId/deals
dealerRouter.post('/:dealershipId/deals', async (req, res) => {
    const { dealershipId } = req.params;
    const { deal_No, deal_amount } = req.body; // Assuming these details are passed in the request body

    try {
        const newDeal = new Deal({
            deal_info: {
                deal_No: deal_No,
                deal_amount: deal_amount
            }
        });

        const savedDeal = await newDeal.save();

        // Add the deal to the dealership
        const dealership = await Dealership.findById(dealershipId);
        if (!dealership) {
            return res.status(404).json({ message: 'Dealership not found' });
        }

        dealership.deals.push(savedDeal._id);
        await dealership.save();

        res.status(200).json({ message: 'Deal added to dealership successfully', deal: savedDeal });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// GET /dealerships/:dealershipId/soldVehicles
dealerRouter.get('/:dealershipId/soldVehicles', async (req, res) => {
    const { dealershipId } = req.params;

    try {
        const dealership = await Dealership.findById(dealershipId)
            .populate({
                path: 'soldVehicles',
                populate: { path: 'owner_id', select: 'user_info' } // Assuming there's an owner_id in SoldVehicle
            });

        if (!dealership) {
            return res.status(404).json({ message: 'Dealership not found' });
        }

        res.json(dealership.soldVehicles);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


module.exports = dealerRouter;