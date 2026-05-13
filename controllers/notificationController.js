import Notification from "../models/Notification.js";

// GET ALL NOTIFICATIONS
export const getNotifications = async (
  req,
  res
) => {
  try {
    const notifications =
      await Notification.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// MARK AS READ
export const markNotificationRead =
  async (req, res) => {
    try {
      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          {
            isRead: true,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };