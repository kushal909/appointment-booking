
import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import {
  saveAuth,
  clearAuth
} from "../../utils/authStorage";
import api from "../../services/api"
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (formData, thunkAPI) => {

    try {

      console.log("formData:", formData);

      const response = await api.post(
        "/auth/register",
        formData
      );

      console.log(
        "Register response:",
        response.data
      );

      // Store token and user
      saveAuth(
        response.data.token,
        response.data.user
      );
      console.log("response",response)
      return response.data;

    } catch (error) {

      console.log("error", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  }
);

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (formData, thunkAPI) => {

//     // API call here

//   }
// );
export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (formData, thunkAPI) => {

    try {

      console.log("Login formData:", formData);

      const response = await api.post(
        "/auth/login",
        formData
      );

      console.log(
        "Login response:",
        response.data
      );

      // Store token and user
      saveAuth(
        response.data.token,
        response.data.user
      );

      return response.data;

    } catch (error) {

      console.log(
        "Login error:",
        error.response?.data
      );

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  }
);
const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

  },

  extraReducers: (builder) => {

    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        console.log("sttate.isAuthenticated",state.isAuthenticated)
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const {
  logout
} = authSlice.actions;

export default authSlice.reducer;