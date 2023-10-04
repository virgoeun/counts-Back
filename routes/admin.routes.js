const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;
// Require the User model in order to interact with the database
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes


// ************* Route for admin sign-up ********************

router.post("/admin/signup", (req, res, next) => {
  const { email, password, userName, isAdmin } = req.body;

  if (email === "" || password === "" || userName === "") {
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

      const isAdmin = true;

      return User.create({
        email,
        password: hashedPassword,
        userName,
        isAdmin,
      });
    })
    .then((createdUser) => {
      const { email, _id, userName } = createdUser;

      // Create a new object that doesn't expose the password
      const newUser = { email, _id, userName };

      // Send a json response containing the user object
      res.status(201).json({ user: newUser });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

//Route for admin login
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Both email & password are required!😳" });
    return;
  }

  User.findOne({ email })
    .then((user) => {

      if (!user.isAdmin) {
        return res.status(403).json({ message: "Access Denied! You've just stepped into the dangerous zone... 🤪" });
      }
      // if (!user || !user.isAdmin || user.password !== password) {
      //   return res.status(403).json({
      //     message:
      //       "Access Denied! You've just stepped into the dangerous zone... 🤪",
      //   });
      // }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, user.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, userName } = user;

        const payload = { _id, email, userName };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Please Provide the Right Password!🤔 " });
      }
    })
    .catch((err) => res.json(err));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid, the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);
  console.log("verify route is working!");

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});




  // User.findOne({ userName })
  //   .then((user) => {
  //     if (!user || !user.isAdmin || user.password !== password) {
  //       return res.status(403).json({ message: "Access Denied! You've just stepped into the dangerous zone... 🤪" });
  //     }

  //     // Generate a token for the admin user
  //     const token = jwt.sign({ username: user.userName }, process.env.TOKEN_SECRET, {
  //       expiresIn: "1h", // Set the token expiration as needed
  //       algorithm: "HS256",
  //     });

  //     res.json({ token });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   });
// });

module.exports = router;
