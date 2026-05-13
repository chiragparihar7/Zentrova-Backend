import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: String,

    message: String,

    assignedTeam: [
      {
        name: String,
        role: String,
        phone: String,
      },
    ],

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Notification",
  notificationSchema
);