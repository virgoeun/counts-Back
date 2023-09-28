const { Schema, model } = require("mongoose");

// Define a schema for each category of data
const activitySchema = new mongoose.Schema([
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    sports: [
      {
        date: {
          type: Date,
          default: Date.now,
        },

        durationInMinutes: Number,

        level: {
          type: String,
          enum: ["High-Intensity", "Mid-Intensity", "Mild"],
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

        description: "String",
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],

    sleep: {
      date: {
        type: Date,
        default: Date.now,
      },
      durationInHours: Number,
    },
    water: {
      date: {
        type: Date,
        default: Date.now,
      },
      waterAmount: {
        enum: ["+3 Liters", "+2 Liters", "+1 Liters", "+0.5 Liters"],
      },
    },

    stress: {
      date: {
        type: Date,
        default: Date.now,
      },
      stressLevel: {
        enum: ["Burned-out", "Middle", "Low", "No Stress!"],
      },
    },
  },
]);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;

// const waterSchema = new mongoose.Schema({
//   userId: { type: Schema.Types.ObjectId, ref: "User" },
//   date: { type: Date, default: Date.now },
//   litersWater: {
//     type: Number,
//     min: 0.1, // Minimum value (e.g., 0.1 liters)
//     max: 999.9, // Maximum value (e.g., 999.9 liters)
//     set: (value) => Math.round(value * 10) / 10, // Rounds to one decimal place e.g. 1.4 liters
//   },
// });

// const stressSchema = new mongoose.Schema({
//   date: { type: Date, default: Date.now },
//   restRating: {
//     type: Number, // option 1-5
//   },
// });

//const Activity = mongoose.model("Activity", activitySchema);
// const Calendar = mongoose.model("Calendar", calendarSchema);
// const Sleep = mongoose.model("Sleep", sleepSchema);
// const Water = mongoose.model("Water", waterSchema);
// const Stress = mongoose.model("Stress", stressSchema);

// module.exports = {
//   Activity,
//  };

// module.exports = {
//   Activity,
//   Calendar,
//   Sleep,
//   Water,
//   Stress,
// };
