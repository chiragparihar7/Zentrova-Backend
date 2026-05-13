import mongoose from "mongoose";

const TimelineSchema = new mongoose.Schema({
  action: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const NoteSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    // Client Info
    ownerName: String,
    phone: String,
    email: String,

    // Site Info
    siteAddress: String,

    // User Ownership 🔐
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Team Information
    assignedTeam: [
      {
        name: String,
        role: String,
        phone: String,
      },
    ],

    // Financial
    dealValue: { type: Number, default: 0 },
    advancePaid: { type: Number, default: 0 },
    labourCost: { type: Number, default: 0 },

    // Progress
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["not_started", "in_progress", "on_hold", "completed"],
      default: "not_started",
    },

    // Dates
    startDate: Date,
    deadline: Date,

    // Lead Source
    leadSource: {
      type: String,
      enum: [
        "google",
        "referral",
        "facebook",
        "instagram",
        "website",
        "whatsapp",
        "other",
      ],
      default: "other",
    },

    referralName: String,
    // Notes & Timeline
    notes: [NoteSchema],
    timeline: [TimelineSchema],
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project ||
  mongoose.model(
    "Project",
    ProjectSchema
  );

export default Project;
