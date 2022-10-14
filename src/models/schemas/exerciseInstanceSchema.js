const mongoose = require("mongoose");
const setSchema = require("./setSchema");

const exerciseInstanceSchema = mongoose.Schema(
  {
    numSets: {
      type: Number,
      required: true,
      max: 100,
    },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    workSets: [setSchema],
  },
  { timestamps: true }
);

module.exports = exerciseInstanceSchema;
