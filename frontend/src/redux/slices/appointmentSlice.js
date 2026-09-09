import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../../services/api";

import {
  getToken
} from "../../utils/authStorage";


// =========================
// INITIAL STATE
// =========================

const initialState = {

  appointment: null,

  bookableSlots: [],

  bookedSlots: [],

  loading: false,

  slotsLoading: false,

  error: null,

  success: false

};


// =========================
// CREATE APPOINTMENT
// =========================

export const createAppointmentSchedule =
  createAsyncThunk(

    "appointment/createAppointmentSchedule",

    async (formData, thunkAPI) => {

      try {

        console.log(
          "Appointment formData:",
          formData
        );


        const token =
          getToken();


        console.log(
          "token:",
          token
        );


        const response =
          await api.post(

            "/appointments/create-schedule",

            formData,

            {
              headers: {

                Authorization:
                  `Bearer ${token}`

              }

            }

          );


        console.log(
          "Appointment response:",
          response.data
        );


        return response.data;


      } catch (error) {

        console.log(
          "Appointment error:",
          error.response?.data
        );


        return thunkAPI.rejectWithValue(

          error.response?.data?.message ||

          "Failed to create appointment schedule"

        );

      }

    }

  );


// =========================
// GET AVAILABLE SLOTS
// =========================

export const getAvailableAppointmentSlots =
  createAsyncThunk(

    "appointment/getAvailableAppointmentSlots",

    async (formData, thunkAPI) => {

      try {

        console.log(
          "Available slot formData:",
          formData
        );


        const token =
          getToken();


        console.log(
          "token:",
          token
        );


        const response =
          await api.post(

            "/appointments/availableslots",

            formData,

            {
              headers: {

                Authorization:
                  `Bearer ${token}`

              }

            }

          );


        console.log(
          "Available slots response:",
          response.data
        );


        return response.data;


      } catch (error) {

        console.log(
          "Available slots error:",
          error.response?.data
        );


        return thunkAPI.rejectWithValue(

          error.response?.data?.message ||

          "Failed to fetch available appointment slots"

        );

      }

    }

  );


// =========================
// SLICE
// =========================

const appointmentSlice =
  createSlice({

    name: "appointment",

    initialState,


    reducers: {


      // =========================
      // CLEAR ERROR
      // =========================

      clearAppointmentError:
        (state) => {

          state.error = null;

        },


      // =========================
      // CLEAR SUCCESS
      // =========================

      clearAppointmentSuccess:
        (state) => {

          state.success = false;

        },


      // =========================
      // CLEAR SLOTS
      // =========================

      clearAvailableSlots:
        (state) => {

          state.bookableSlots = [];

          state.bookedSlots = [];

        }

    },


    // =========================
    // EXTRA REDUCERS
    // =========================

    extraReducers:
      (builder) => {

        builder


          // =================================================
          // CREATE APPOINTMENT
          // =================================================


          // =========================
          // PENDING
          // =========================

          .addCase(

            createAppointmentSchedule.pending,

            (state) => {

              state.loading = true;

              state.error = null;

              state.success = false;

            }

          )


          // =========================
          // SUCCESS
          // =========================

          .addCase(

            createAppointmentSchedule.fulfilled,

            (state, action) => {

              state.loading = false;


              state.appointment =
                action.payload.data;


              state.success = true;

              state.error = null;

            }

          )


          // =========================
          // ERROR
          // =========================

          .addCase(

            createAppointmentSchedule.rejected,

            (state, action) => {

              state.loading = false;

              state.error =
                action.payload;

              state.success = false;

            }

          )


          // =================================================
          // GET AVAILABLE SLOTS
          // =================================================


          // =========================
          // PENDING
          // =========================

          .addCase(

            getAvailableAppointmentSlots.pending,

            (state) => {

              state.slotsLoading = true;

              state.bookableSlots = [];

              state.bookedSlots = [];

              state.error = null;

            }

          )


          // =========================
          // SUCCESS
          // =========================

          .addCase(

            getAvailableAppointmentSlots.fulfilled,

            (state, action) => {

              state.slotsLoading = false;


              console.log(
                "API payload:",
                action.payload
              );


              // =========================
              // SAVE BOOKABLE SLOTS
              // =========================

              state.bookableSlots =
                action.payload.bookableSlots || [];


              // =========================
              // SAVE BOOKED SLOTS
              // =========================

              state.bookedSlots =
                action.payload.bookedSlots || [];


              state.error = null;

            }

          )


          // =========================
          // ERROR
          // =========================

          .addCase(

            getAvailableAppointmentSlots.rejected,

            (state, action) => {

              state.slotsLoading = false;

              state.bookableSlots = [];

              state.bookedSlots = [];

              state.error =
                action.payload;

            }

          );

      }

  });


// =========================
// EXPORT ACTIONS
// =========================

export const {

  clearAppointmentError,

  clearAppointmentSuccess,

  clearAvailableSlots

} = appointmentSlice.actions;


// =========================
// EXPORT REDUCER
// =========================

export default appointmentSlice.reducer;