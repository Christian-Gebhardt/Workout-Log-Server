const express = require("express");
const { getExercises } = require("../controllers/exerciseController");
const { protect } = require("../middleware/authenticationHandler");

const router = express.Router();

router.route("/").get(protect, getExercises);

module.exports = router;
