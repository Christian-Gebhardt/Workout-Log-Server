const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedWorkouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompletedWorkout",
    },
  ],
  personalRecords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalRecord",
    },
  ],
});

module.exports = mongoose.model("History", historySchema);
