import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

import appointmentReducer from "./slices/appointmentSlice";

import bookingReducer from "./slices/bookingSlice";

import doctorReducer from "./slices/doctorSlice";


export const store = configureStore({

  reducer: {

    auth: authReducer,

    appointment: appointmentReducer,

    booking: bookingReducer,

    doctor: doctorReducer

  }

});