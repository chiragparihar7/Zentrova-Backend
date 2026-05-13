import Appointment from "../models/Appointment.js";

import Notification from "../models/Notification.js";

export const checkAppointmentReminders =
  async () => {
    try {
      const now = new Date();

      const appointments =
        await Appointment.find({
          status: "scheduled",
        });

      for (const appointment of appointments) {
        const meetingTime = new Date(
          appointment.meetingDate
        );

        for (const reminder of appointment.reminders) {
          if (reminder.sent) continue;

          const diffMinutes =
            (meetingTime - now) /
            1000 /
            60;

          if (
            diffMinutes <=
              reminder.minutesBefore &&
            diffMinutes > 0
          ) {
            await Notification.create({
              title:
                "Upcoming Appointment",

              message: `Meeting with ${appointment.clientName} at ${appointment.location} in ${Math.round(diffMinutes)} minutes`,

              assignedTeam:
                appointment.assignedTeam,
            });

            reminder.sent = true;
          }
        }

        await appointment.save();
      }
    } catch (error) {
      console.log(error.message);
    }
  };