const express = require("express");
const {
  getRoutines,
  addRoutine,
  addWorkoutToRoutine,
} = require("../controllers/routineController");
const { protect } = require("../middleware/authenticationHandler");

const router = express.Router();

router.route("/").get(protect, getRoutines).post(protect, addRoutine);
router.route("/addWorkout/:id").patch(protect, addWorkoutToRoutine);

module.exports = router;
