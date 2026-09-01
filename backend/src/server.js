import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";


// Routes
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import bookedAppointmentRoutes from "./routes/bookedAppointmentRoutes.js";


dotenv.config();

const app = express();

import dns from "dns";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);
// ========================================
// DATABASE
// ========================================

connectDB();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


// ========================================
// HEALTH CHECK
// ========================================

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Doctor Appointment API is running"
  });

});


// ========================================
// ROUTES
// ========================================

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/doctors",
  doctorRoutes
);


app.use(
  "/api/patients",
  patientRoutes
);


app.use(
  "/api/appointments",
  appointmentRoutes
);


app.use(
  "/api/booked-appointments",
  bookedAppointmentRoutes
);


// ========================================
// 404
// ========================================

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "API route not found"
  });

});


// ========================================
// SERVER
// ========================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});