const mongoose = require("mongoose");

const routineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // in cycle order!
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
      },
    ],
    nextWorkout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
    },
    completedCycles: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      maxLength: 300,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Routine", routineSchema);
