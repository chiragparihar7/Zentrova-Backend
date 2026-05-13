import cron from "node-cron";

import {
  checkAppointmentReminders,
} from "../services/reminderService.js";

cron.schedule("* * * * *", async () => {
  console.log(
    "Checking appointment reminders..."
  );

  await checkAppointmentReminders();
});