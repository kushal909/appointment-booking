import mongoose from "mongoose";

import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import BookedAppointment from "../models/BookedAppointment.js";


/*
  BOOK APPOINTMENT

  POST /api/booked-appointments/book

  Patient only
*/
export const bookAppointment = async (
  req,
  res
) => {
  try {

    const {
      appointmentId,
      startTime,
      endTime,
      reason
    } = req.body;


    if (
      !appointmentId ||
      !startTime ||
      !endTime ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message:
          "appointmentId, startTime, endTime and reason are required"
      });
    }


    // Find patient
    const patient =
      await Patient.findOne({
        userId: req.user.id
      });


    if (!patient) {
      return res.status(404).json({
        success: false,
        message:
          "Patient profile not found"
      });
    }


    /*
      Atomic update

      Only change the slot if it is
      currently available.
    */
    const appointment =
      await Appointment.findOneAndUpdate(
        {
          _id: appointmentId,

          slots: {
            $elemMatch: {
              startTime,
              endTime,
              status: "available"
            }
          }
        },

        {
          $set: {
            "slots.$.status": "booked"
          }
        },

        {
          new: true
        }
      );


    /*
      If null, someone else may have
      already booked the slot.
    */
    if (!appointment) {
      return res.status(409).json({
        success: false,
        message:
          "Slot is not available or has already been booked"
      });
    }


    /*
      Create booked appointment
    */
    try {

      const bookedAppointment =
        await BookedAppointment.create({

          patientId: patient._id,

          doctorId: appointment.doctorId,

          appointmentId: appointment._id,

          startTime,

          endTime,

          date: appointment.date,

          reason,

          status: "booked"
        });


      return res.status(201).json({
        success: true,
        message:
          "Appointment booked successfully",
        data: bookedAppointment
      });

    } catch (error) {

      /*
        If creating BookedAppointment fails,
        release the slot again.
      */

      await Appointment.updateOne(
        {
          _id: appointmentId,

          slots: {
            $elemMatch: {
              startTime,
              endTime,
              status: "booked"
            }
          }
        },
        {
          $set: {
            "slots.$.status": "available"
          }
        }
      );

      throw error;
    }

  } catch (error) {

    console.error(
      "BOOK APPOINTMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to book appointment",
      error: error.message
    });
  }
};


/*
  GET PATIENT'S APPOINTMENTS

  GET /api/booked-appointments/patient
*/
export const getMyBookedAppointments = async (
  req,
  res
) => {
  try {

    const patient =
      await Patient.findOne({
        userId: req.user.id
      });


    if (!patient) {
      return res.status(404).json({
        success: false,
        message:
          "Patient profile not found"
      });
    }


    const appointments =
      await BookedAppointment.find({
        patientId: patient._id
      })
        .populate(
          "doctorId",
          "doctorName specialization qualification hospitalName phoneNumber consultationFee"
        )
        .populate(
          "appointmentId",
          "date fromDate endDate"
        )
        .sort({
          date: -1,
          startTime: 1
        });


    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });

  } catch (error) {

    console.error(
      "GET PATIENT APPOINTMENTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch patient appointments",
      error: error.message
    });
  }
};


/*
  GET DOCTOR'S APPOINTMENTS

  GET /api/booked-appointments/doctor
*/
export const getDoctorBookedAppointments = async (
  req,
  res
) => {
  try {

    const doctor =
      await Doctor.findOne({
        userId: req.user.id
      });


    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }


    const appointments =
      await BookedAppointment.find({
        doctorId: doctor._id
      })
        .populate(
          "patientId",
          "patientName phoneNumber dateOfBirth gender bloodGroup address"
        )
        .populate(
          "appointmentId",
          "date fromDate endDate"
        )
        .sort({
          date: 1,
          startTime: 1
        });


    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });

  } catch (error) {

    console.error(
      "GET DOCTOR APPOINTMENTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch doctor appointments",
      error: error.message
    });
  }
};


/*
  GET SINGLE BOOKED APPOINTMENT

  GET /api/booked-appointments/:id
*/
export const getBookedAppointmentById = async (
  req,
  res
) => {
  try {

    const { id } = req.params;


    const appointment =
      await BookedAppointment.findById(id)
        .populate(
          "patientId",
          "patientName phoneNumber dateOfBirth gender bloodGroup address"
        )
        .populate(
          "doctorId",
          "doctorName specialization qualification hospitalName phoneNumber"
        )
        .populate(
          "appointmentId",
          "date fromDate endDate"
        );


    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Booked appointment not found"
      });
    }


    return res.status(200).json({
      success: true,
      data: appointment
    });

  } catch (error) {

    console.error(
      "GET BOOKED APPOINTMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch booked appointment",
      error: error.message
    });
  }
};


/*
  CANCEL APPOINTMENT

  PATCH /api/booked-appointments/cancel/:id

  Patient only
*/
export const cancelAppointment = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    const patient =
      await Patient.findOne({
        userId: req.user.id
      });


    if (!patient) {
      return res.status(404).json({
        success: false,
        message:
          "Patient profile not found"
      });
    }


    const booked =
      await BookedAppointment.findOne({
        _id: id,
        patientId: patient._id,
        status: "booked"
      });


    if (!booked) {
      return res.status(404).json({
        success: false,
        message:
          "Booked appointment not found"
      });
    }


    /*
      Update booked appointment status
    */
    booked.status = "cancelled";

    await booked.save();


    /*
      Make original slot available again
    */
    await Appointment.updateOne(
      {
        _id: booked.appointmentId,

        slots: {
          $elemMatch: {
            startTime: booked.startTime,
            endTime: booked.endTime,
            status: "booked"
          }
        }
      },
      {
        $set: {
          "slots.$.status": "available"
        }
      }
    );


    return res.status(200).json({
      success: true,
      message:
        "Appointment cancelled successfully"
    });

  } catch (error) {

    console.error(
      "CANCEL APPOINTMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to cancel appointment",
      error: error.message
    });
  }
};


/*
  COMPLETE APPOINTMENT

  PATCH /api/booked-appointments/complete/:id

  Doctor only
*/
export const completeAppointment = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    const doctor =
      await Doctor.findOne({
        userId: req.user.id
      });


    if (!doctor) {
      return res.status(404).json({
        success: false,
        message:
          "Doctor profile not found"
      });
    }


    const appointment =
      await BookedAppointment.findOne({
        _id: id,
        doctorId: doctor._id,
        status: "booked"
      });


    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Booked appointment not found"
      });
    }


    appointment.status = "completed";

    await appointment.save();


    return res.status(200).json({
      success: true,
      message:
        "Appointment marked as completed",
      data: appointment
    });

  } catch (error) {

    console.error(
      "COMPLETE APPOINTMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to complete appointment",
      error: error.message
    });
  }
};