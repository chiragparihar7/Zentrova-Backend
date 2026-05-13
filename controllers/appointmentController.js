import Appointment from "../models/Appointment.js";

// CREATE
export const createAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAppointments = async (
  req,
  res
) => {
  try {
    const appointments =
      await Appointment.find().sort({
        meetingDate: 1,
      });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
export const getAppointmentById =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE
export const updateAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE
export const deleteAppointment =
  async (req, res) => {
    try {
      await Appointment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message: "Appointment deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// CHECK IN
export const checkInAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findById(
          req.params.id
        );

      appointment.status = "in-progress";

      appointment.checkInTime =
        new Date();

      await appointment.save();

      res.status(200).json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// CHECK OUT
export const checkOutAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findById(
          req.params.id
        );

      appointment.status = "completed";

      appointment.checkOutTime =
        new Date();

      await appointment.save();

      res.status(200).json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// ADD NOTE
export const addAppointmentNote =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findById(
          req.params.id
        );

      appointment.notes.push({
        text: req.body.text,
      });

      await appointment.save();

      res.status(200).json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };