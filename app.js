// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();


const cors = require("cors"); // Import the cors middleware

// Configure CORS middleware
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware to all routes

const { isAuthenticated } = require("./middleware/jwt.middleware.js");
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// const homeRouter = require("./routes/Home.routes");
// app.use("/api", homeRouter);

const profileRouter = require("./routes/profile.routes");
app.use("/api", isAuthenticated, profileRouter);

const musicRouter = require("./routes/music.routes");
app.use("/api", isAuthenticated, musicRouter);

const videoRouter = require("./routes/video.routes");
app.use("/api", isAuthenticated, videoRouter);

const workoutRouter = require("./routes/workout.routes");
app.use("/api", isAuthenticated, workoutRouter);

const styleRouter = require("./routes/style.routes");
app.use("/api", isAuthenticated, styleRouter);

const adminWorkoutRouter = require("./routes/adminWorkout.routes");
app.use("/api", isAuthenticated, adminWorkoutRouter);

const checkinRouter = require("./routes/checkin.routes");
app.use("/api", isAuthenticated, checkinRouter);

const challengeRouter = require("./routes/challenge.routes");
app.use("/api", isAuthenticated, challengeRouter);

const bookmarksRouter = require("./routes/bookmarks.routes");
app.use("/api", isAuthenticated, bookmarksRouter);

//ADMIN
const admineProfileRouter = require("./routes/adminprofile.routes");
app.use("/api", isAuthenticated, admineProfileRouter);

const adminStylerouter = require("./routes/adminStyle.routes");
app.use("/api", isAuthenticated, adminStylerouter);

//EXTRA - maybe for Admin User?
const geoCoderRouter = require("./routes/geocode.routes");
app.use("/api", isAuthenticated, geoCoderRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const adminRouter = require("./routes/admin.routes");
app.use("/auth", adminRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
