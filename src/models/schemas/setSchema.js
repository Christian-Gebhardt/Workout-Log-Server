const mongoose = require("mongoose");

const setSchema = mongoose.Schema({
  setNumber: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  previousPerformance: {
    type: String,
    maxLength: 50,
  },
  weight: {
    type: Number,
    max: 5000,
  },
  reps: {
    type: Number,
    max: 1000,
  },
  setType: {
    type: String,
    enum: ["S", "W", "D", "G"],
  },
});

module.exports = setSchema;
