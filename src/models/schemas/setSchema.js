const mongoose = require("mongoose");

const setSchema = mongoose.Schema({
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
    default: "W",
    enum: ["S", "W", "D", "G"],
  },
});

module.exports = setSchema;
