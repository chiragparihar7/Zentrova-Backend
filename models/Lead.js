const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    // ✅ Address as paragraph (as you wanted)
    address: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "contacted", "quotation", "converted", "lost"],
      default: "pending",
    },

    source: {
      type: String, // facebook, website, referral
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

module.exports = mongoose.model("Lead", leadSchema);