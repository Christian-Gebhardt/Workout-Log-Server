// mongoose pre hooks

// pre hook: remove all invalid sets from completed workout (either reps/weight not set or not checked)
const removeInvalidSetsFromCompletedWorkout = (workout) => {
  // don't use same object id as workout
  if (workout._id) delete workout._id;
  for (i = 0; i < workout.exercises.length; ++i) {
    // filter all invalid sets
    workout.exercises[i].sets = workout.exercises[i].sets.filter(
      (set) => set.isChecked && set.reps && set.weight
    );
  }
  return workout;
};

module.exports = {
  removeInvalidSetsFromCompletedWorkout,
};
