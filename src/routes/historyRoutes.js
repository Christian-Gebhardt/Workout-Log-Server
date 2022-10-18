const express = require("express");
const {
  addCompletedWorkoutToHistory,
} = require("../controllers/historyController");
const { protect } = require("../middleware/authenticationHandler");

const router = express.Router();

router.route("/addWorkout").post(protect, addCompletedWorkoutToHistory);

module.exports = router;
