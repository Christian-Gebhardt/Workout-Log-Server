const mongoose = require("mongoose");
const setSchema = require("./setSchema");

const exerciseInstanceSchema = mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    sets: [setSchema],
  },
  { timestamps: true }
);

module.exports = exerciseInstanceSchema;
