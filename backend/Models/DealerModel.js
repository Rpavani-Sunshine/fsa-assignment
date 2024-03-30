const mongoose = require('mongoose');

// Deal schema
const dealSchema = new mongoose.Schema({ 
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Car'
    }, 
    deal_info: {
        deal_No : String,
        deal_amount : Number
    }
  });

  // SoldVehicle schema
const soldVehicleSchema = new mongoose.Schema({ 
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Car'
    }, 
    vehicle_info: {
      paid_Amount: Number,
    }
  });

const Deal = mongoose.model('Deal', dealSchema);
const SoldVehicle = mongoose.model('SoldVehicle', soldVehicleSchema);

module.exports = { Deal, SoldVehicle};