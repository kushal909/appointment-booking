import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available"
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
});

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    fromTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    slots: {
      type: [slotSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

appointmentSchema.index({
  doctorId: 1,
  date: 1
});

export default mongoose.model(
  "Appointment",
  appointmentSchema
);