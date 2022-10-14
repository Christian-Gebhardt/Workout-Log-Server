const express = require("express");
const {
  createUser,
  getUser,
  loginUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authenticationHandler");

const router = express.Router();

router.route("/me").get(protect, getUser);
router.post("/create", createUser);
router.post("/login", loginUser);

module.exports = router;
