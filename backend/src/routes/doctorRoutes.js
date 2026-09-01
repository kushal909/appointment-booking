// import express from "express";

// import {
//   getAllDoctors,
//   getDoctorById,
//   getMyDoctorProfile,
//   updateDoctorProfile,
//   updateDoctorAccount
// } from "../controllers/doctorController.js";

// import protect from "../middleware/authMiddleware.js";

// import authorize from "../middleware/roleMiddleware.js";

// const router = express.Router();


// // ========================================
// // PUBLIC ROUTES
// // ========================================

// // Get all doctors
// // GET /api/doctors
// router.get("/", getAllDoctors);


// // Get doctor by ID
// // GET /api/doctors/:id
// router.get("/:id", getDoctorById);


// // ========================================
// // PROTECTED DOCTOR ROUTES
// // ========================================

// // Get logged-in doctor profile
// // GET /api/doctors/profile
// router.get(
//   "/profile",
//   protect,
//   authorize("doctor"),
//   getMyDoctorProfile
// );


// // Update doctor profile
// // PUT /api/doctors/profile
// router.put(
//   "/profile",
//   protect,
//   authorize("doctor"),
//   updateDoctorProfile
// );


// // Update doctor account
// // PUT /api/doctors/account
// router.put(
//   "/account",
//   protect,
//   authorize("doctor"),
//   updateDoctorAccount
// );


// export default router;

import express from "express";

import {
  getAllDoctors,
  getDoctorById,
  getMyDoctorProfile,
  updateDoctorProfile,
  updateDoctorAccount
} from "../controllers/doctorController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// PUBLIC
// ========================================

// Get all doctors
// GET /api/doctors
router.get("/", getAllDoctors);


// ========================================
// DOCTOR
// ========================================

// Get my profile
// GET /api/doctors/profile
router.get(
  "/profile",
  protect,
  authorize("doctor"),
  getMyDoctorProfile
);


// Update profile
// PUT /api/doctors/profile
router.put(
  "/profile",
  protect,
  authorize("doctor"),
  updateDoctorProfile
);


// Update account
// PUT /api/doctors/account
router.put(
  "/account",
  protect,
  authorize("doctor"),
  updateDoctorAccount
);


// ========================================
// PUBLIC
// ========================================

// Get doctor by ID
// GET /api/doctors/:id
router.get("/:id", getDoctorById);


export default router;