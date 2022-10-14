const mongoose = require("mongoose");

const preferencesSchema = mongoose.Schema(
  {
    language: {
      type: String,
      default: "EN",
      enum: ["DE", "EN"],
    },
    unit: {
      type: String,
      default: "METRIC",
      enum: ["METRIC", "IMPERIAL"],
    },
    darkmode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = preferencesSchema;
