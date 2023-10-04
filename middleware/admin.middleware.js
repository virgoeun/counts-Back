const { isAuthenticated } = require('./jwt.middleware');
const User = require('../models/User.model');

const adminMiddleware = (req, res, next) => {
  

    const userId = req.payload._id; 

    // Now you can use the userId to fetch the user from the database
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is an admin
        if (user.isAdmin) {
          // User is an admin, proceed with the next middleware or route handler
          req.user = user; // Set the user on req.user for further use if needed
          next();
        } else {
          res.status(403).json({ message: 'Access denied. User is not an admin.' });
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
};
// adminMiddleware.js
// module.exports = (req, res, next) => {
//   const user = req.user; // Assuming you have a middleware that sets the user object

//   if (!user || !user.isAdmin) {
//     return res.status(403).json({ message: "Access denied. Admin access required." });
//   }

//   next(); // User is an admin, continue to the next middleware or route handler
// };
module.exports = adminMiddleware;