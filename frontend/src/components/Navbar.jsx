import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../redux/slices/authSlice";
import { getUser, getToken } from "../utils/authStorage";

import "./Navbar.css";

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = getUser();
  const token = getToken();

  const isAuthenticated = !!token && !!user;


  const getHomePath = () => {

    if (!user) {
      return "/";
    }

    if (user.role === "doctor") {
      return "/doctor";
    }

    if (user.role === "patient") {
      return "/patient";
    }

    return "/";
  };


  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");
  };


  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <Link
          to={getHomePath()}
          className="navbar-logo"
        >
          MediCare
        </Link>


        {/* Navigation */}

        <div className="navbar-links">

          {!isAuthenticated ? (

            <>
              <Link to="/">
                Home
              </Link>

              <Link to="/about">
                About
              </Link>

              <Link to="/contact">
                Contact
              </Link>
            </>

          ) : (

            <>

              {/* Common Home */}

              <Link to={getHomePath()}>
                Home
              </Link>
              


              {/* ===================== */}
              {/* DOCTOR */}
              {/* ===================== */}

              {user.role === "doctor" && (
                <>

                  <Link to="/doctor/create-appointment">
                    Create Appointments
                  </Link>

                  <Link to="/doctor/bookings">
                    Booked Bookings
                  </Link>

                </>
              )}


              {/* ===================== */}
              {/* PATIENT */}
              {/* ===================== */}

              {user.role === "patient" && (
                <>

                  <Link to="/doctors">
                    See Doctors
                  </Link>

                  <Link to="/patient/bookings">
                    Booked Bookings
                  </Link>

                </>
              )}


              {/* Common */}

              <Link to="/about">
                About
              </Link>

              <Link to="/contact">
                Contact
              </Link>

            </>

          )}

        </div>


        {/* Authentication */}

        <div className="navbar-auth">

          {!isAuthenticated ? (

            <>
              <Link
                to="/login"
                className="login-link"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Get Started
              </Link>
            </>

          ) : (

            <>

              <span className="welcome-text">
                Hi, {user?.username}
              </span>

              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;