const express = require("express");
const {
  getRoutines,
  addRoutine,
  addWorkoutToRoutine,
  deleteWorkoutFromRoutine,
  deleteRoutine,
} = require("../controllers/routineController");
const { protect } = require("../middleware/authenticationHandler");

const router = express.Router();

router.route("/").get(protect, getRoutines).post(protect, addRoutine);
router.route("/:id").delete(protect, deleteRoutine);
router.route("/addWorkout/:id").post(protect, addWorkoutToRoutine);
router
  .route("/deleteWorkout/:routineId/:workoutId")
  .delete(protect, deleteWorkoutFromRoutine);

module.exports = router;
