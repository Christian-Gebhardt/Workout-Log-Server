const mongoose = require("mongoose");
const setSchema = require("./schemas/setSchema");

const personalRecordSchema = mongoose.Schema(
  {
    exericse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    workout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompletedWorkout",
    },
    set: {
      type: setSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PersonalRecord", personalRecordSchema);
