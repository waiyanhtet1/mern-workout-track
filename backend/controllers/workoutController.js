const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

// get all workouts
async function getAllWorkout(req, res) {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
}

// get a single workout
async function getSingleWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: "No workout with such id!" });

  const workout = await Workout.findById(id);

  if (!workout)
    return res.status(404).json({ msg: "No workout with such id!" });

  res.status(200).json(workout);
}

// create a new workout
async function createWorkout(req, res) {
  const { title, load, reps } = req.body;

  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");
  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "Please fill all fields", emptyFields });

  try {
    const newWorkout = await Workout.create(req.body);
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete workout
async function deleteWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: "No workout with such id!" });

  await Workout.findByIdAndDelete(id);

  res.status(200).json({ msg: "Deleted successfully!" });
}

// update workout
async function updateWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: "No workout with such id!" });

  const workout = await Workout.findByIdAndUpdate(id, { $set: req.body });

  if (!workout)
    return res.status(404).json({ msg: "No workout with such id!" });

  res.status(200).json({ msg: "Updated successfully!" });
}

module.exports = {
  getAllWorkout,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
