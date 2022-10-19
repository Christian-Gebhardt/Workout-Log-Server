const express = require("express");
const {
  addCompletedWorkoutToHistory,
  getCompletedWorkoutsFromHistory,
} = require("../controllers/historyController");
const { protect } = require("../middleware/authenticationHandler");

const router = express.Router();

router
  .route("/completedWorkouts")
  .get(protect, getCompletedWorkoutsFromHistory);
router
  .route("/addCompletedWorkout")
  .post(protect, addCompletedWorkoutToHistory);
module.exports = router;
