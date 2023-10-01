const { Schema, model } = require("mongoose");


const activitySchema = new Schema([
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    date: {
      type: Date,
      required:true,
      //default: Date.now,
    },
    sleep: {
      type:String,
      enum: ["8", "7", "6", "4.5", "3"],
    },
    water: {
      type: String,
      enum: ["3", "2", "1", "0.5"],
    },
    stress: {
      type: String,
      enum: ["0", "4", "8", "10"],
    },
    sports: [
      {
        durationInMinutes: {

          type:String,
          enum: ["3", "2", "1", "0.5", "0.25", "0.1"],
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
            "Cycling",
            "Hiking",
            "Bouldering",
            "Boxing",
            "Body Weight Training",
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


