const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen on port
    app.listen(PORT, () =>
      console.log(`Connected to Database & server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
