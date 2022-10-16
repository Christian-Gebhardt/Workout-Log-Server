const asyncHandler = require("express-async-handler");
const Routine = require("../models/routineModel");
const Workout = require("../models/workoutModel");

const getRoutines = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const routines = await Routine.find({ user: userId }).populate("workouts");

  if (routines) {
    res.status(200).json(routines);
  } else {
    res.status(400);
    throw new Error("Cannot find routines of user with id " + userId);
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

const deleteRoutine = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const routineId = req.params.id;

  const routine = await Routine.findById(routineId);

  if (routine && routine.user.equals(userId)) {
    // delete workouts from routine first
    const workoutIds = routine.workouts;
    const workoutsDeleted = await Workout.deleteMany({
      _id: { $in: workoutIds },
    });

    // then delete routine itself
    const routineDeleted = await Routine.deleteOne({ _id: routineId });

    if (workoutsDeleted && routineDeleted) {
      res.status(200).json(isDeleted);
    } else {
      res.status(400);
      throw new Error("Cannot delete routine with id " + routineId);
    }
  } else {
    res.status(400);
    throw new Error(
      "Cannot find routine with id " +
        routineId +
        " or routine does not belong to user with id " +
        userId
    );
  }
});

const addWorkoutToRoutine = asyncHandler(async (req, res) => {
  const routineId = req.params.id;
  const workout = req.body;
  const userId = req.user._id;

  const routine = await Routine.findById(routineId);

  // check if routine exists and belongs to use
  if (routine && routine.user.equals(userId)) {
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
    throw new Error(
      "Cannot find routine with id " +
        routineId +
        " or routine does not belong to user with id " +
        userId
    );
  }
});

const deleteWorkoutFromRoutine = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const routineId = req.params.routineId;
  const workoutId = req.params.workoutId;

  const routine = await Routine.findById(routineId);

  if (routine && routine.user.equals(userId)) {
    const isDeleted = await Workout.findByIdAndDelete(workoutId);

    if (isDeleted) {
      res.status(200).json(isDeleted);
    } else {
      res.status(400);
      throw new Error("Cannot delete workout with id " + workoutId);
    }
  } else {
    res.status(400);
    throw new Error(
      "Cannot find routine with id " +
        routineId +
        " or routine does not belong to user with id " +
        userId
    );
  }
});

module.exports = {
  getRoutines,
  addRoutine,
  deleteRoutine,
  addWorkoutToRoutine,
  deleteWorkoutFromRoutine,
};
