const mongoose = require("mongoose");

const exerciseModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
  },
  description: {
    type: String,
  },
  exerciseMedia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExerciseMedia",
  },
});

module.exports = mongoose.model("Exercise", exerciseModel);
