import express from "express";

import {
  getMyPatientProfile,
  getPatientById,
  updatePatientProfile,
  updatePatientAccount
} from "../controllers/patientController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// PATIENT PROFILE
// ========================================


// Get logged-in patient profile
// GET /api/patients/profile
router.get(
  "/profile",
  protect,
  authorize("patient"),
  getMyPatientProfile
);


// Update patient profile
// PUT /api/patients/profile
router.put(
  "/profile",
  protect,
  authorize("patient"),
  updatePatientProfile
);


// Update patient account
// PUT /api/patients/account
router.put(
  "/account",
  protect,
  authorize("patient"),
  updatePatientAccount
);


// ========================================
// PATIENT BY ID
// ========================================

// GET /api/patients/:id
router.get(
  "/:id",
  protect,
  getPatientById
);


export default router;