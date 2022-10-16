const mongoose = require("mongoose");
const preferencesSchema = require("./schemas/preferencesSchema");
const stateSchema = require("./schemas/stateSchema");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      maxLength: 70,
      validate: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      /* validate: [
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
        "Please fill a strong password",
      ], */
    },
    sex: {
      type: String,
      enum: ["m", "f", "d"],
    },
    height: {
      type: Number,
      min: 0,
      max: 300,
    },
    weight: {
      type: Number,
      min: 0,
      max: 1500,
    },
    state: stateSchema,
    preferences: preferencesSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
