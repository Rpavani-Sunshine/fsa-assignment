const mongoose = require('mongoose');


// Car schema
const carSchema = new mongoose.Schema({ 
    type: String,
    name: String,
    model: String,
    car_info: {
      price: Number,
    }
  });

const Car = mongoose.model('Car', carSchema);
module.exports = Car;

