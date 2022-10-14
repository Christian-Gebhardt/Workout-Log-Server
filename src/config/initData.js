const Exercise = require("../models/exerciseModel");

const initData = async (data) => {
  try {
    if (data.exercises) {
      // check if already initialized
      const exerciseCount = await Exercise.count();
      if (exerciseCount == 0) {
        await Exercise.insertMany(data.exercises);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initData };
