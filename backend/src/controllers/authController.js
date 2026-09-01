
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

import generateToken from "../utils/generateToken.js";


// =====================================================
// REGISTER
// =====================================================

export const register = async (req, res) => {

  const session = await User.startSession();

  try {

    const {
      username,
      email,
      password,
      role,
      doctorDetails,
      patientDetails
    } = req.body;


    // =================================================
    // VALIDATION
    // =================================================

    if (
      !username ||
      !email ||
      !password ||
      !role
    ) {

      return res.status(400).json({
        success: false,
        message:
          "username, email, password and role are required"
      });

    }


    // =================================================
    // ROLE VALIDATION
    // =================================================

    if (
      !["doctor", "patient"].includes(role)
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Role must be doctor or patient"
      });

    }


    // =================================================
    // ROLE-SPECIFIC DETAILS VALIDATION
    // =================================================

    if (
      role === "doctor" &&
      !doctorDetails
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Doctor details are required"
      });

    }


    if (
      role === "patient" &&
      !patientDetails
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Patient details are required"
      });

    }


    // =================================================
    // CHECK EMAIL
    // =================================================

    const normalizedEmail =
      email.toLowerCase().trim();


    const existingUser =
      await User.findOne({
        email: normalizedEmail
      });


    if (existingUser) {

      return res.status(409).json({
        success: false,
        message:
          "Email already registered"
      });

    }


    // =================================================
    // HASH PASSWORD
    // =================================================

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    // =================================================
    // START TRANSACTION
    // =================================================

    session.startTransaction();


    // =================================================
    // CREATE USER
    // =================================================

    const users =
      await User.create(
        [
          {
            username: username.trim(),

            email: normalizedEmail,

            password: hashedPassword,

            role
          }
        ],
        {
          session
        }
      );


    const user = users[0];


    // =================================================
    // CREATE DOCTOR
    // =================================================

    if (role === "doctor") {

      await Doctor.create(
        [
          {
            userId: user._id,

            ...doctorDetails
          }
        ],
        {
          session
        }
      );

    }


    // =================================================
    // CREATE PATIENT
    // =================================================

    if (role === "patient") {

      await Patient.create(
        [
          {
            userId: user._id,

            ...patientDetails
          }
        ],
        {
          session
        }
      );

    }


    // =================================================
    // COMMIT TRANSACTION
    // =================================================

    await session.commitTransaction();


    // =================================================
    // GENERATE JWT
    // =================================================

    const token =
      generateToken(user);


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({

      success: true,

      message:
        "Registration successful",

      token,

      user: {
        id: user._id,

        username:
          user.username,

        email:
          user.email,

        role:
          user.role
      }

    });


  } catch (error) {

    // =================================================
    // ROLLBACK TRANSACTION
    // =================================================

    if (
      session.inTransaction()
    ) {

      await session.abortTransaction();

    }


    console.error(
      "REGISTER ERROR:",
      error
    );


    // Duplicate email
    if (error.code === 11000) {

      return res.status(409).json({

        success: false,

        message:
          "Email already registered"

      });

    }


    return res.status(500).json({

      success: false,

      message:
        "Registration failed",

      error:
        error.message

    });


  } finally {

    await session.endSession();

  }

};


// =====================================================
// LOGIN
// =====================================================

export const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // =================================================
    // VALIDATION
    // =================================================

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required"

      });

    }


    // =================================================
    // NORMALIZE EMAIL
    // =================================================

    const normalizedEmail =
      email.toLowerCase().trim();


    // =================================================
    // FIND USER
    // =================================================

    const user =
      await User.findOne({
        email: normalizedEmail
      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    // =================================================
    // COMPARE PASSWORD
    // =================================================

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    // =================================================
    // GENERATE TOKEN
    // =================================================

    const token =
      generateToken(user);


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({

      success: true,

      message:
        "Login successful",

      token,

      user: {

        id: user._id,

        username:
          user.username,

        email:
          user.email,

        role:
          user.role

      }

    });


  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Login failed",

      error:
        error.message

    });

  }

};

