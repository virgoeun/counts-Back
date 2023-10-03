const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;

// *****************************************************************
// *********** POST /auth/signup: Create a new User in DB **********

router.post("/signup", (req, res, next) => {
  const { email, password, userName } = req.body;

  if (email === "" || password === ""|| userName==="") {
    res.status(400).json({ message: "Email & password are required!😳" });
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address! 🤓 " });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "😰 Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "This email already exists!😒" });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, userName });
    })
    .then((createdUser) => {
      const { email, _id, userName } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, _id, userName };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// *****************************************************************
// ************************** POST /auth/login *********************

// POST  /auth/login - Verifies email and password and returns a JWT (create a JWT)
// router.post("/login", (req, res, next) => {
//   const { email, password } = req.body;

//   if (email === "" || password === "") {
//     res.status(400).json({ message: "Provide email and password." });
//     return;
//   }
// });

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Both email & password are required!😳" });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "😶‍🌫️ User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, userName } = foundUser;

        // Create an object that will be set as the token payload (store the user data without pw)
        const payload = { _id, email, userName };

        // Create a JSON Web Token and sign it
        // jwt.sign() method: jwt.sign(payload, secretKey, options)
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Please Provie me the Right Password!🤔" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// *****************************************************************
// ************************** GET /auth/verify *********************
// GET  /auth/verify  -  Used to verify JWT stored on the "client"

router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid, the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);
  console.log("verify route is working!");

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
