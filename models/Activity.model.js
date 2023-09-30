const { Schema, model } = require("mongoose");

// Define a schema for each category of data
const activitySchema = new Schema([
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    date: {
      type: Date,
      default: Date.now,
    },
    sleep: {
      type:String,
      enum: ["+8 hours", "+7 hours", "+6 hours", "+4~5 hours", "I need Sleep! 😪"],
    },
    water: {
      type: String,
      enum: ["+3l 💧💧💧 ", "+2l 💧💧", "+1l 💧", "+0.5l 💦"],
    },
    stress: {
      type: String,
      enum: ["Burned-out🤯", "Middle", "Low", "No Stress!🥰"],
    },
    sports: [
      {
        durationInMinutes: {

          type:String,
          enum: ["+3 hours", "+2 hours", "+1 hour", "+30 minutes", "+20 minutes", "<10 minutes!😎"],
        },

        level: {
          type: String,
          enum: ["High-Intensity 🥵", "Mid-Intensity 😊", "Mild 😌"],
        },
        type: {
          type: String,
          enum: [
            "Yoga/Pilates",
            "Weight Training",
            "Crossfit",
            "Walk",
            "Water Sports",
            "Winter Sports",
            "Stretching",
            "Run",
            "Cycle",
            "Hiking",
            "Bouldering",
            "Boxing",
            "Others",
          ],
        },

        description: String,
        // isCompleted: {
        //   type: Boolean,
        //   default: false,
        // },
      },
    ],
    note: String,
  },
]);

const Activity = model("Activity", activitySchema);

module.exports = Activity;
