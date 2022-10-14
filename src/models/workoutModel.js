const moongose = require("mongoose");
const exerciseInstanceSchema = require("./schemas/exerciseInstanceSchema");

const workoutSchema = moongose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    notes: {
      type: String,
      maxLength: 300,
    },
    exercises: [exerciseInstanceSchema],
  },
  { timestamps: true }
);

module.exports = moongose.model("Workout", workoutSchema);
