import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name:  {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v[0].toUpperCase() === v[0];
      },
      message: '{VALUE} should be Capitalized!'
    },
  },
  capital: {
    type: Boolean,
    required: true,
  },
  location: {
    lat: Number,
    long: Number
  }
});

export let CityModel = mongoose.model('City', citySchema);
