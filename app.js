// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express()

const cors = require("cors"); // Import the cors middleware

// Configure CORS middleware
const corsOptions = {
  origin: "http://localhost:5174",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware to all routes

const { isAuthenticated } = require("./middleware/jwt.middleware.js");
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes/index.routes")
app.use("/api", allRoutes);

const profileRouter = require("./routes/profile.routes")
app.use("/api", isAuthenticated, profileRouter);

const musicRouter = require("./routes/music.routes")
app.use("/api", isAuthenticated, musicRouter)

const videoRouter = require("./routes/video.routes")
app.use("/api", isAuthenticated, videoRouter)

const adminRouter = require("./routes/admin.routes")
app.use("/api", isAuthenticated, adminRouter)

const favoriteRouter = require("./routes/favorite.routes")
app.use("/api", favoriteRouter);

const checkinRouter = require("./routes/checkin.routes")
app.use("/api", checkinRouter);

const challengeRouter = require("./routes/challenge.routes")
app.use("/api", challengeRouter)

//EXTRA - maybe for Admin User?
const geoCoderRouter = require("./routes/geocode.routes")
app.use("/api", geoCoderRouter)

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
