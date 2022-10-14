const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user by id
      req.user = await User.findById(decoded.id).select("-password");
      // go to actual controller function
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Invalid token, not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Invalid authorization header");
  }
});

module.exports = { protect };
