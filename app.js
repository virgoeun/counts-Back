// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

//spotify web api pkg
//const SpotifyWebApi = require('spotify-web-api-node');


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes/index.routes")
app.use("/api", allRoutes);

const profileRouter = require("./routes/profile.routes")
app.use("/api", profileRouter);

const playlistRouter = require("./routes/playlist.routes")
app.use("/api", playlistRouter);

const instaRouter = require("./routes/insta.routes")
app.use("/api", instaRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
