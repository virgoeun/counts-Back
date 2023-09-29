const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    avatar: {
      type: String,
      default: "/images/avatar.png",
    },
    userName: {
      type: String,
      trim: true,
      unique: [true, "Username is already taken."],
    },
    userGoal: {
      type: String,
      enum: [
        "Increase Movements",
        "Become Fitter",
        "Stick to healthy habits",
        "Cherish my Body!",
        "Just For Fun",
      ],
    },
    userData: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Favorite" }],

    isAdmin: {type:Boolean, default:false}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

//example
// const newUser = new User({
//     email: "example@email.com",
//     password: "password123",
//     userName: "JohnDoe",
//     userData: [activityObjectId1, activityObjectId2], // Replace with actual ObjectIds
//   });

//   // Save the user document
//   newUser.save();
