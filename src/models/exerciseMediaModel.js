const mongoose = require("mongoose");

const exerciseMediaSchema = mongoose.Schema({
  picture: {
    type: Buffer,
    content: String,
  },
  video: {
    type: Buffer,
    content: String,
  },
});

module.exports = mongoose.model("ExerciseMedia", exerciseMediaSchema);
