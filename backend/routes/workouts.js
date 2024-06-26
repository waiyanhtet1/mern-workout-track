const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getAllWorkout,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

// protect all route for middleware
router.use(requireAuth);

// GET all workouts
router.get("/", getAllWorkout);

// GET single workouts
router.get("/:id", getSingleWorkout);

// POST workout
router.post("/", createWorkout);

// DELETE workout
router.delete("/:id", deleteWorkout);

// UPDATE workouts
router.patch("/:id", updateWorkout);

module.exports = router;
