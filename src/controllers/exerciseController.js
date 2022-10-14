const asyncHandler = require("express-async-handler");
const Exercise = require("../models/exerciseModel");

const getExercises = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find();

  if (exercises) {
    res.status(200).json(exercises);
  } else {
    res.status(400);
    throw new Error("Cannot find exercises.");
  }
});

module.exports = {
  getExercises,
};
