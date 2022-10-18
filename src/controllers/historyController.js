const asyncHandler = require("express-async-handler");
const CompletedWorkout = require("../models/completedWorkoutModel");
const History = require("../models/historyModel");

const addCompletedWorkoutToHistory = asyncHandler(async (req, res) => {
  const user = req.user;
  const completedWorkout = req.body;
  const history = await History.find({ user: user._id });

  // try to create completed workout and add it to history
  const savedWorkout = await CompletedWorkout.create(completedWorkout);

  history.completedWorkouts.push(savedWorkout._id);
  history.save();
  if (history && completedWorkout) {
    res.status(201).json(savedWorkout);
  } else {
    res.status(400);
    throw new Error("Invalid completed workout data");
  }
});

module.exports = {
  addCompletedWorkoutToHistory,
};
