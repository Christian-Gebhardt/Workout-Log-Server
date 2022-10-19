const asyncHandler = require("express-async-handler");
const CompletedWorkout = require("../models/completedWorkoutModel");
const History = require("../models/historyModel");
const {
  removeInvalidSetsFromCompletedWorkout,
} = require("../utils/completedWorkoutUtil");

const getCompletedWorkoutsFromHistory = asyncHandler(async (req, res) => {
  console.log(user);
  const history = await History.findOne({ user });

  const completedWorkouts = await CompletedWorkout.find({
    _id: { $in: history.completedWorkouts },
  });

  console.log(completedWorkouts);
  if (history && completedWorkouts) {
    res.status(200).json(completedWorkouts);
  } else {
    res.status(400);
    throw new Error(
      "Cannot find completed workouts of user with id " + user._id
    );
  }
});

const addCompletedWorkoutToHistory = asyncHandler(async (req, res) => {
  const user = req.user;
  var completedWorkout = req.body;
  const history = await History.findOne({ user });

  // pre remove all sets that are invalid (not checked or null on reps or weigth)
  completedWorkout = removeInvalidSetsFromCompletedWorkout(completedWorkout);

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
  getCompletedWorkoutsFromHistory,
  addCompletedWorkoutToHistory,
};
