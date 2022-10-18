// mongoose pre hooks

// pre hook: remove all invalid sets from completed workout (either reps/weight not set or not checked)
function removeInvalidSetsFromCompletedWorkout() {
  console.log("before", this);
  for (exercise in this.exercises) {
    // filter all invalid sets
    exercise.sets = exercise.sets.filter(
      (set) => set.isChecked && set.reps && set.weight
    );

    // also remove isChecked attribute
    exercise.sets = exercise.sets.map(({ isChecked, ...rest }) => rest);
  }
  console.log("after", this);
}

module.exports = {
  removeInvalidSetsFromCompletedWorkout,
};
