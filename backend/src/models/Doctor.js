import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    doctorName: {
      type: String,
      required: true,
      trim: true
    },

    specialization: {
      type: String,
      required: true
    },

    qualification: {
      type: String
    },

    collegeName: {
      type: String
    },

    hospitalName: {
      type: String
    },

    phoneNumber: {
      type: String
    },

    experience: {
      type: Number,
      default: 0
    },

    address: {
      type: String
    },

    consultationFee: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Doctor", doctorSchema);