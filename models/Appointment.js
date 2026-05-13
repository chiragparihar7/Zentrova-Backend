import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  text: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reminderSchema = new mongoose.Schema({
  minutesBefore: Number,

  sent: {
    type: Boolean,
    default: false,
  },
});

const assignedTeamSchema = new mongoose.Schema({
  name: String,

  role: String,

  phone: String,
});

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    clientName: {
      type: String,
      required: true,
    },

    clientPhone: String,

    appointmentType: {
      type: String,

      enum: [
        "client-meeting",
        "site-visit",
        "inspection",
        "follow-up",
        "vendor",
      ],
    },

    location: String,

    meetingDate: {
      type: Date,
      required: true,
    },

    // TEAM MEMBERS
    assignedTeam: [assignedTeamSchema],

    status: {
      type: String,

      enum: [
        "scheduled",
        "in-progress",
        "completed",
        "rescheduled",
        "cancelled",
      ],

      default: "scheduled",
    },

    checkInTime: Date,

    checkOutTime: Date,

    notes: [noteSchema],

    reminders: {
      type: [reminderSchema],

      default: [
        {
          minutesBefore: 1440,
        },

        {
          minutesBefore: 60,
        },

        {
          minutesBefore: 15,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Appointment",
  appointmentSchema
);