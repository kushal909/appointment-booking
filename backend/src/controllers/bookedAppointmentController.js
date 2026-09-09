import mongoose from "mongoose";

//import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
//import Doctor from "../models/Doctor.js";
import BookedAppointment from "../models/BookedAppointment.js";


/*
  BOOK APPOINTMENT

  POST /api/booked-appointments/book

  Patient only
*/
export const bookAppointment = async (req, res) => {
  try {
    const {
      appointmentId,
      doctorId,
      startTime,
      endTime,
      date,
      fromDate,
      endDate,
      reason
    } = req.body;

    if (
      !appointmentId ||
      !doctorId ||
      !startTime ||
      !endTime ||
      !date ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message:
          "appointmentId, doctorId, startTime, endTime, date and reason are required"
      });
    }

    // Find patient
    const patient = await Patient.findOne({
      userId: req.user.id
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found"
      });
    }

    // Create booked appointment
    const bookedAppointment =
      await BookedAppointment.create({
        patientId: patient._id,

        doctorId,

        appointmentId,

        startTime,

        endTime,

        date,

        fromDate,

        endDate,

        reason,

        status: "booked"
      });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: bookedAppointment
    });

  } catch (error) {

    console.error(
      "BOOK APPOINTMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to book appointment",
      error: error.message
    });
  }
};