import express from "express";

import {
  bookAppointment,
  // getMyBookedAppointments,
  // getDoctorBookedAppointments,
  //getBookedAppointmentById,
  //cancelAppointment,
  //completeAppointment
} from "../controllers/bookedAppointmentController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// PATIENT
// ========================================


// Book appointment
//
// POST /api/booked-appointments/book
router.post(
  "/book",
  protect,
  authorize("patient"),
  bookAppointment
);


// Get my booked appointments
//
// GET /api/booked-appointments/patient
// router.get(
//   "/patient",
//   protect,
//   authorize("patient"),
//   getMyBookedAppointments
// );


// Cancel appointment
//
// PATCH /api/booked-appointments/cancel/:id
// router.patch(
//   "/cancel/:id",
//   protect,
//   authorize("patient"),
//   cancelAppointment
// );


// ========================================
// DOCTOR
// ========================================


// Get doctor's appointments
//
// GET /api/booked-appointments/doctor
// router.get(
//   "/doctor",
//   protect,
//   authorize("doctor"),
//   getDoctorBookedAppointments
// );


// Complete appointment
//
// PATCH /api/booked-appointments/complete/:id
// router.patch(
//   "/complete/:id",
//   protect,
//   authorize("doctor"),
//   completeAppointment
// );


// ========================================
// COMMON
// ========================================


// Get appointment by ID
//
// GET /api/booked-appointments/:id
// router.get(
//   "/:id",
//   protect,
//   getBookedAppointmentById
// );


export default router;