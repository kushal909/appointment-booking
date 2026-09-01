import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    // Reference to User collection
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    // Patient personal details
    patientName: {
      type: String,
      required: true,
      trim: true
    },

    phoneNumber: {
      type: String,
      trim: true
    },

    dateOfBirth: {
      type: Date
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
      ]
    },

    address: {
      type: String,
      trim: true
    },

    emergencyContact: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Patient = mongoose.model(
  "Patient",
  patientSchema
);

export default Patient;