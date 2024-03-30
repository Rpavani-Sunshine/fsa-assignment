const mongoose = require('mongoose');


// Admin schema
const adminSchema = new mongoose.Schema({ 
  admin_id : {
    type: String,
    required: true,
    unique: true
  },
  password: String, 
});

// User schema
const userSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
    unique: true
  },
  user_location: String,
  user_info: {
    user_name: String,
    user_address: String
  },
  password: String,
  vehicles: [
    { type: mongoose.Schema.Types.ObjectId, 
        ref: 'SoldVehicle' 
    }] // Reference to sold vehicles
});

// Dealership schema
const dealershipSchema = new mongoose.Schema({ 
  dealership_email: {
    type: String,
    required: true,
    unique: true
  },
  dealership_name: String,
  dealership_location: String,
  password: String,
  dealership_info: {
    dealer_name: String,
    dealer_ph_no: Number,
    dealing_amount: Number,
  },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  deals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }],
  soldVehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SoldVehicle' }]
});

// Compile models from schemas
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Dealership = mongoose.model('Dealership', dealershipSchema);

module.exports = { Admin, User, Dealership};