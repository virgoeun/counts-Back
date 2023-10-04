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
    // avatar: {
    //   type: String,
    //   default: "../images/avatar.png",
    // },
    userName: {
      type: String,
      trim: true,
      unique: [true, "Username is already taken."],
    },
    userData: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Favorite" }],
    styles: [{ type: Schema.Types.ObjectId, ref: "Style" }],
    likes: {
      styles: [{ type: Schema.Types.ObjectId, ref: "Style" }],
      workouts: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    },
    isAdmin: {type:Boolean, default:false}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

