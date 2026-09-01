import mongoose from "mongoose";

const bookedAppointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    reason: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "booked",
        "completed",
        "cancelled"
      ],
      default: "booked"
    }
  },
  {
    timestamps: true
  }
);

bookedAppointmentSchema.index({
  doctorId: 1,
  date: 1,
  startTime: 1
});

export default mongoose.model(
  "BookedAppointment",
  bookedAppointmentSchema
);