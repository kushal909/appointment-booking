import express from "express";

import {
  createAppointmentSchedule,
  getDoctorSchedules,
  getAvailableSlots,
  getAppointmentById,
  deleteAppointmentSchedule,availableAppointmentLists, bookAppointmentSlot
} from "../controllers/appointmentController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// DOCTOR
// ========================================

// Create schedule
// POST /api/appointments/schedule
router.post(
  "/create-schedule",
  protect,
  authorize("doctor"),
  createAppointmentSchedule
);


// Get my schedules
// GET /api/appointments/my-schedules
router.get(
  "/my-schedules",
  protect,
  authorize("doctor"),
  getDoctorSchedules
);


// ========================================
// PATIENT
// ========================================

// Get available slots
// GET /api/appointments/available-slots
router.post(
  "/availableslots",
  protect,
  authorize("patient"),
availableAppointmentLists
);

router.post(
  "/bookslot",
  protect,
  authorize("patient"),
  bookAppointmentSlot
);
router.get(
  "/available-slots",
  protect,
  authorize("patient"),
  getAvailableSlots
);

// ========================================
// COMMON
// ========================================

// Get schedule by ID
// GET /api/appointments/:id
router.get(
  "/:id",
  protect,
  getAppointmentById
);


// ========================================
// DOCTOR
// ========================================

// Delete schedule
// DELETE /api/appointments/:id
router.delete(
  "/:id",
  protect,
  authorize("doctor"),
  deleteAppointmentSchedule
);


export default router;