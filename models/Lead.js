import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 IMPORTANT: user link
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    // ✅ Address as paragraph
    address: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "contacted", "quotation", "converted", "lost"],
      default: "pending",
    },

    source: {
      type: String,
    },

    assignedTo: {
      type: String,
    },

    dealValue: {
      type: Number,
      default: 0,
    },

    labourValue: {
      type: Number,
      default: 0,
    },

    followUpDate: {
      type: Date,
    },

    notes: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    timeline: [
      {
        action: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;