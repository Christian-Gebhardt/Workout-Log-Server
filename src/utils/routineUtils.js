// function to get the next workout in order
const getNextWorkout = (workouts, nextWorkoutId) => {
  const index = workouts.findIndex((id) => id.equals(nextWorkoutId));
  return workouts[(index + 1) % workouts.length];
};

module.exports = {
  getNextWorkout,
};
