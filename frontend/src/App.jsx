import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import DoctorHome from "./pages/DoctorHome";
import PatientHome from "./pages/PatientHome";

import CreateAppointment from "./pages/CreateAppointment";

// Doctor
 import DoctorBookings from "./pages/DoctorBookings";

 import AvailableAppointments
  from "./pages/AvailableAppointments";

// // Patient
// import Doctors from "./pages/Doctors";
// import PatientBookings from "./pages/PatientBookings";

import DoctorList from "./pages/Doctorlist"
function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>


        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ========================= */}
        {/* DOCTOR HOME */}
        {/* ========================= */}

        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorHome />
            </ProtectedRoute>
          }
        />


        {/* ========================= */}
        {/* CREATE APPOINTMENT */}
        {/* ========================= */}

        <Route
          path="/doctor/create-appointment"
          element={
            <ProtectedRoute allowedRole="doctor">
              <CreateAppointment />
            </ProtectedRoute>
          }
        />


        {/* ========================= */}
        {/* DOCTOR BOOKINGS */}
        {/* ========================= */}

        <Route
          path="/doctor/bookings"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorBookings />
            </ProtectedRoute>
          }
        />


        {/* ========================= */}
        {/* PATIENT HOME */}
        {/* ========================= */}

        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute allowedRole="patient">
              <DoctorList/>
            </ProtectedRoute>
          }
        />
<Route
  path="/patient/book-appointment/:doctorId"
  element={
    <ProtectedRoute allowedRole="patient">
      <AvailableAppointments />
    </ProtectedRoute>
  }
/>
        {/* ========================= */}
        {/* SEE DOCTORS */}
        {/* ========================= */}
{/* 
        <Route
          path="/patient/doctors"
          element={
            <ProtectedRoute allowedRole="patient">
              <Doctors />
            </ProtectedRoute>
          }
        /> */}


        {/* ========================= */}
        {/* PATIENT BOOKINGS */}
        {/* ========================= */}

        {/* <Route
          path="/patient/bookings"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientBookings />
            </ProtectedRoute>
          }
        /> */}


      </Routes>

    </BrowserRouter>
  );
}

export default App;