const asyncHandler = require("express-async-handler");
const Routine = require("../models/routineModel");
const Workout = require("../models/workoutModel");
const { getNextWorkout } = require("../utils/routineUtils");

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
  const user = req.user;
  const routine = await Routine.create({
    ...req.body,
    user: user._id,
    workouts: [],
  });

  if (routine) {
    // set routine as users active routine if not already set
    if (!user.state.activeRoutine) {
      user.state.activeRoutine = routine;
      await user.save();
    }
    res.status(201).json(routine);
  } else {
    res.status(400);
    throw new Error("Invalid routine data");
  }
});

const deleteRoutine = asyncHandler(async (req, res) => {
  const user = req.user;
  const userId = req.user._id;
  const routineId = req.params.id;

  const routine = await Routine.findById(routineId);

  if (routine && routine.user.equals(userId)) {
    // delete workouts from routine first
    const workoutIds = routine.workouts;
    const workoutsDeleted = await Workout.deleteMany({
      _id: { $in: workoutIds },
    });

    // if routine to delete is users activeRoutine, set activeRoutine to null
    if (user.state.activeRoutine.equals(routineId)) {
      user.state.activeRoutine = null;
      await user.save();
    }

    // then delete routine itself
    const routineDeleted = await Routine.deleteOne({ _id: routineId });

    if (workoutsDeleted && routineDeleted) {
      res.status(200).json(routineDeleted);
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

      // if nextWorkout is not set yet (empty workout array)
      if (!routine.nextWorkout) {
        console.log("setting next workout");
        routine.nextWorkout = newWorkout;
      }

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
    // set the next workout if it will be affected by deletion
    if (routine.nextWorkout.equals(workoutId)) {
      // if deleted workout is the next workout
      if (routine.workouts.length <= 1) {
        // if routine workouts will be empty after deletion
        routine.nextWorkout = null;
      } else {
        // set next workout to the workout after the current next workout
        routine.nextWorkout = getNextWorkout(
          routine.workouts,
          routine.nextWorkout
        );
      }
    }

    const isDeleted = await Workout.findByIdAndDelete(workoutId);

    // remove workout reference from the routine
    routine.workouts = routine.workouts.filter((e) => !e.equals(workoutId));
    // save changes to the routine document
    await routine.save();

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
