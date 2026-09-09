import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../../services/api";

import { getToken } from "../../utils/authStorage";


// =========================
// INITIAL STATE
// =========================

const initialState = {

  bookings: [],

  loading: false,

  error: null,

  success: false

};


// =========================
// GET DOCTOR BOOKINGS
// =========================

export const getDoctorBookings =
  createAsyncThunk(

    "booking/getDoctorBookings",

    async (_, thunkAPI) => {

      try {

        console.log(
          "Fetching doctor bookings..."
        );


        const token = getToken();

        console.log(
          "token:",
          token
        );


        const response = await api.get(
          "/appointments/my-schedules",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("booking response",response)

        console.log(
          "Doctor bookings response:",
          response.data
        );


        return response.data;


      } catch (error) {

        console.log(
          "Doctor bookings error:",
          error.response?.data
        );


        return thunkAPI.rejectWithValue(

          error.response?.data?.message ||

          "Failed to fetch doctor bookings"

        );

      }

    }

  );


// =========================
// SLICE
// =========================

const bookingSlice = createSlice({

  name: "booking",

  initialState,


  reducers: {

    clearBookingError: (state) => {

      state.error = null;

    },


    clearBookingSuccess: (state) => {

      state.success = false;

    },


    clearBookings: (state) => {

      state.bookings = [];

    }

  },


  extraReducers: (builder) => {

    builder


      // =========================
      // PENDING
      // =========================

      .addCase(

        getDoctorBookings.pending,

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

        getDoctorBookings.fulfilled,

        (state, action) => {

          state.loading = false;

          state.bookings =
            action.payload.data || [];

          state.success = true;

          state.error = null;

        }

      )


      // =========================
      // ERROR
      // =========================

      .addCase(

        getDoctorBookings.rejected,

        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

          state.success = false;

        }

      );

  }

});


export const {

  clearBookingError,

  clearBookingSuccess,

  clearBookings

} = bookingSlice.actions;


export default bookingSlice.reducer;