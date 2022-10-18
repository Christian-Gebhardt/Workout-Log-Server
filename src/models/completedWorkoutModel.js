const mongoose = require("mongoose");
const {
  removeInvalidSetsFromCompletedWorkout,
} = require("../utils/completedWorkoutUtil");
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

completedWorkoutSchema.pre("save", removeInvalidSetsFromCompletedWorkout);

module.exports = mongoose.model("CompletedWorkout", completedWorkoutSchema);
