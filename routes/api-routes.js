const { Router } = require("express");
const Workout = require("../models/Workout");

const router = require("express").Router();

//API Routes
//==========================================================

//route for getting all workouts when loading the index.html page
//have an .aggregate() call instead of a find, so we can add the totalDuration field to our schema
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        //total duration for a single workout will be the sum of all the durations the exercises array of objects
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      console.log("data from GET result for all workouts", data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body).then((result) => {
    res.json(result);
  });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ day: -1 })
    .then((data) => {
      console.log("data from 'range' query = ", data);
      let results = [];
      for (let i = 0; i < 7; i++) {
        results.push(data[i]);
      }
      console.log("results from range .then = ", results);
      res.json(results);
    });
});

module.exports = router;
