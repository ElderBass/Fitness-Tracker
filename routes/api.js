const Workout = require("../models/Workout");

const router = require("express").Router();


//HTML Routes
//==========================================================

router.get("/exercise", (req, res) => {
    res.redirect("../exercise.html")
})

//API Routes
//==========================================================
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((data) => {

      console.log("data from GET result for all workouts", data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log("body inside PUT route server side", req.body);

  Workout.updateOne({ _id: req.params.id }, { $set: { exercises: req.body } })
    .then((result) => {
        console.log("result from PUT query", result)
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  Workout.create(body).then((result) => {
    console.log(result);
    res.json(result);
  });
});

// router.get("api/workouts/range", (req, res) => {
//     Workout.find({}, {})
// })

module.exports = router;
