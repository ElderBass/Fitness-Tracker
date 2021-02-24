const { Router } = require("express");
const Workout = require("../models/Workout");

const router = require("express").Router();

//HTML Routes
//==========================================================

router.get("/", (req, res) => {
  res.redirect("../index.html");
});

router.get("/exercise", (req, res) => {
  res.redirect("../exercise.html");
});

router.get("/stats", (req, res) => {
  res.redirect("../stats.html");
});

//API Routes
//==========================================================
router.get("/api/workouts", (req, res) => {
  // Workout.aggregate([{
  //   $addFields: {
  //     totalDuration: { $sum: "$exercises.duration" },
  //   },
  // }]);

  Workout.find({})
    .then((data) => {
      let mostRecent = data[data.length - 1];
      console.log(mostRecent)
      let total = 0;
      for (i = 0; i < mostRecent.exercises.length; i++) {
        total += mostRecent.exercises[i].duration;
      }
      console.log(total)
      Workout.aggregate([ {
        $addFields: {
          totalDuration: {$sum: total}
        }
      }])
      .then(results => {
      console.log("data from GET result for all workouts", results);
      res.json(results);
    })
  })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log("body inside PUT route server side", req.body);

  console.log(req.params.id);

  Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then((result) => {
      Workout.aggregate([{
        $addFields: {
          totalDuration: { $sum: duration },
        },
      }]);
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  console.log("body for api/workouts POST = ", body);
  Workout.create(body).then((result) => {
    console.log(result);
    res.json(result);
  });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then((data) => {
        console.log("data from 'range' query = ", data)
      let results = [];
      for (let i = 0; i < 7; i++) {
        results.push(data[i]);
      }
      console.log("results from range .then = ", results)
      res.json(results);
    });
});

module.exports = router;
