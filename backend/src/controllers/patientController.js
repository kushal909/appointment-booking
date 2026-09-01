import Patient from "../models/Patient.js";
import User from "../models/User.js";


/*
  GET LOGGED-IN PATIENT PROFILE

  GET /api/patients/profile
*/
export const getMyPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      userId: req.user.id
    })
      .populate("userId", "username email role");

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: patient
    });

  } catch (error) {
    console.error("GET PATIENT PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient profile",
      error: error.message
    });
  }
};


/*
  GET PATIENT BY ID

  GET /api/patients/:id
*/
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id)
      .populate("userId", "username email role");

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: patient
    });

  } catch (error) {
    console.error("GET PATIENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
      error: error.message
    });
  }
};


/*
  UPDATE PATIENT PROFILE

  PUT /api/patients/profile
*/
export const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      userId: req.user.id
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found"
      });
    }

    const {
      patientName,
      phoneNumber,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      emergencyContact
    } = req.body;

    patient.patientName =
      patientName ?? patient.patientName;

    patient.phoneNumber =
      phoneNumber ?? patient.phoneNumber;

    patient.dateOfBirth =
      dateOfBirth ?? patient.dateOfBirth;

    patient.gender =
      gender ?? patient.gender;

    patient.bloodGroup =
      bloodGroup ?? patient.bloodGroup;

    patient.address =
      address ?? patient.address;

    patient.emergencyContact =
      emergencyContact ?? patient.emergencyContact;

    await patient.save();

    return res.status(200).json({
      success: true,
      message: "Patient profile updated successfully",
      data: patient
    });

  } catch (error) {
    console.error("UPDATE PATIENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update patient profile",
      error: error.message
    });
  }
};


/*
  UPDATE PATIENT ACCOUNT

  PUT /api/patients/account
*/
export const updatePatientAccount = async (req, res) => {
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
    console.error("UPDATE PATIENT ACCOUNT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update account",
      error: error.message
    });
  }
};