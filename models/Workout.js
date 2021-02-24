const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date().setDate(new Date().getDate()),
  },
  exercises: Array,
});

const Workout = mongoose.model("Workout", WorkoutSchema);

Workout.aggregate([
  // { $unwind: "$exercises" },
  {
    $addFields: {
      totalDuration: { $sum: "$exercises.duration" },
    },
  }
]);

module.exports = Workout;
