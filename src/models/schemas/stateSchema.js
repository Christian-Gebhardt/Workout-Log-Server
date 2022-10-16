const mongoose = require("mongoose");

const stateSchema = mongoose.Schema(
  {
    activeRoutine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = stateSchema;
