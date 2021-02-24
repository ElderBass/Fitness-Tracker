const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
day: Date,
exercises: [ {
  type: String,
  name: String,
  weight: Number,
  reps: Number,
  sets: Number,
  duration: Number,
  distance: Number
}]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
