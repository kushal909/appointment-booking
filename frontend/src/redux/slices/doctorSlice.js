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

  doctors: [],

  loading: false,

  error: null,

  success: false

};


// =========================
// GET ALL DOCTORS
// =========================

export const getAllDoctors =
  createAsyncThunk(

    "doctor/getAllDoctors",

    async (_, thunkAPI) => {

      try {

        console.log(
          "Fetching all doctors..."
        );


        const token = getToken();

        console.log(
          "token:",
          token
        );


        const response = await api.get(

          "/doctors",

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        );


        console.log(
          "Doctors response:",
          response.data
        );


        return response.data;


      } catch (error) {

        console.log(
          "Doctors error:",
          error.response?.data
        );


        return thunkAPI.rejectWithValue(

          error.response?.data?.message ||

          "Failed to fetch doctors"

        );

      }

    }

  );


// =========================
// SLICE
// =========================

const doctorSlice = createSlice({

  name: "doctor",

  initialState,


  reducers: {

    clearDoctorError: (state) => {

      state.error = null;

    },


    clearDoctorSuccess: (state) => {

      state.success = false;

    },


    clearDoctors: (state) => {

      state.doctors = [];

    }

  },


  extraReducers: (builder) => {

    builder


      // =========================
      // PENDING
      // =========================

      .addCase(

        getAllDoctors.pending,

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

        getAllDoctors.fulfilled,

        (state, action) => {

          state.loading = false;

          state.doctors =
            action.payload.data || [];

          state.success = true;

          state.error = null;

        }

      )


      // =========================
      // ERROR
      // =========================

      .addCase(

        getAllDoctors.rejected,

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

  clearDoctorError,

  clearDoctorSuccess,

  clearDoctors

} = doctorSlice.actions;


export default doctorSlice.reducer;