const asyncHandler = require("express-async-handler");
const Routine = require("../models/routineModel");
const Workout = require("../models/workoutModel");

const getRoutines = asyncHandler(async (req, res) => {
  const routines = await Routine.find({ user: req.user._id }).populate(
    "workouts"
  );

  if (routines) {
    res.status(200).json(routines);
  } else {
    res.status(400);
    throw new Error("Cannot find routines of user");
  }
});

const addRoutine = asyncHandler(async (req, res) => {
  const routine = await Routine.create({
    ...req.body,
    user: req.user._id,
    workouts: [],
  });

  if (routine) {
    res.status(201).json(routine);
  } else {
    res.status(400);
    throw new Error("Invalid routine data");
  }
});

const addWorkoutToRoutine = asyncHandler(async (req, res) => {
  const routineId = req.params.id;
  const workout = req.body;
  const user = req.user;

  console.log(routineId, workout);

  const routine = await Routine.findById(routineId);

  // check if routine exists and belongs to use
  if (routine && routine.user.equals(user._id)) {
    const { name, notes } = workout;
    console.log(name, notes);

    const newWorkout = await Workout.create(workout);

    if (newWorkout) {
      routine.workouts.push(newWorkout);
      await routine.save();
      res.status(201).json(routine);
    } else {
      res.status(400);
      throw new Error("Cannot create new workout, invalid data");
    }
  } else {
    res.status(400);
    throw new Error("Cannot find routine or routine does not belong to user");
  }
});

module.exports = {
  getRoutines,
  addRoutine,
  addWorkoutToRoutine,
};
