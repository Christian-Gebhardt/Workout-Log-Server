const mongoose = require("mongoose");
const exerciseInstanceSchema = require("./schemas/exerciseInstanceSchema");

const completedWorkoutSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    exercises: [exerciseInstanceSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompletedWorkout", completedWorkoutSchema);
