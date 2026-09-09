import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

/*
  GET ALL DOCTORS
  GET /api/doctors
*/
// import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "./slices/authSlice";

// import appointmentReducer from "./slices/appointmentSlice";

// import bookingReducer from "./slices/bookingSlice";


// export const store = configureStore({

//   reducer: {

//     auth: authReducer,

//     appointment: appointmentReducer,

//     booking: bookingReducer

//   }

// });

export const getAllDoctors = async (req, res) => {
  try {

    const doctors = await Doctor.find({
      // If you only want active doctors:
      // isActive: true
    })
      .populate(
        "userId",
        "username email mobileNumber"
      )
      .sort({
        doctorName: 1
      });


    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });

  } catch (error) {

    console.error(
      "GET ALL DOCTORS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message
    });

  }
};


/*
  GET DOCTOR BY ID

  GET /api/doctors/:id
*/
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findById(id)
      .populate("userId", "username email role");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: doctor
    });

  } catch (error) {
    console.error("GET DOCTOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
      error: error.message
    });
  }
};


/*
  GET LOGGED-IN DOCTOR PROFILE

  GET /api/doctors/profile
*/
export const getMyDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.user.id
    })
      .populate("userId", "username email role");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: doctor
    });

  } catch (error) {
    console.error("GET MY DOCTOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor profile",
      error: error.message
    });
  }
};


/*
  UPDATE DOCTOR PROFILE

  PUT /api/doctors/profile
*/
export const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.user.id
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found"
      });
    }

    const {
      doctorName,
      specialization,
      qualification,
      collegeName,
      hospitalName,
      phoneNumber,
      experience,
      address,
      consultationFee
    } = req.body;

    doctor.doctorName =
      doctorName ?? doctor.doctorName;

    doctor.specialization =
      specialization ?? doctor.specialization;

    doctor.qualification =
      qualification ?? doctor.qualification;

    doctor.collegeName =
      collegeName ?? doctor.collegeName;

    doctor.hospitalName =
      hospitalName ?? doctor.hospitalName;

    doctor.phoneNumber =
      phoneNumber ?? doctor.phoneNumber;

    doctor.experience =
      experience ?? doctor.experience;

    doctor.address =
      address ?? doctor.address;

    doctor.consultationFee =
      consultationFee ?? doctor.consultationFee;

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor
    });

  } catch (error) {
    console.error("UPDATE DOCTOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update doctor profile",
      error: error.message
    });
  }
};


/*
  UPDATE DOCTOR USERNAME / EMAIL

  PUT /api/doctors/account
*/
export const updateDoctorAccount = async (req, res) => {
  try {
    const {
      username,
      email
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (email && email !== user.email) {

      const existingUser =
        await User.findOne({
          email,
          _id: { $ne: user._id }
        });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists"
        });
      }
    }

    if (username !== undefined) {
      user.username = username;
    }

    if (email !== undefined) {
      user.email = email;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Account updated successfully",

      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("UPDATE DOCTOR ACCOUNT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update account",
      error: error.message
    });
  }
};