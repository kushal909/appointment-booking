import { useState } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  registerUser
} from "../redux/slices/authSlice";

import {
  useNavigate,
  Link
} from "react-router-dom";

import "./Auth.css";


function Register() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    loading,
    error
  } = useSelector(
    (state) => state.auth
  );


  const [formData, setFormData] = useState({

    username: "",
    email: "",
    password: "",
    role: "patient",

    patientDetails: {
      age: "",
      gender: "",
      phone: "",
      address: ""
    },

    doctorDetails: {
      specialization: "",
      qualification: "",
      experience: "",
      phone: "",
      consultationFee: ""
    }

  });


  // ==============================
  // COMMON INPUT
  // ==============================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value

    }));

  };


  // ==============================
  // PATIENT INPUT
  // ==============================

  const handlePatientChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData((prev) => ({

      ...prev,

      patientDetails: {

        ...prev.patientDetails,

        [name]: value

      }

    }));

  };


  // ==============================
  // DOCTOR INPUT
  // ==============================

  const handleDoctorChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData((prev) => ({

      ...prev,

      doctorDetails: {

        ...prev.doctorDetails,

        [name]: value

      }

    }));

  };


  // ==============================
  // ROLE
  // ==============================

  const handleRoleChange = (e) => {

    setFormData((prev) => ({

      ...prev,

      role: e.target.value

    }));

  };


  // ==============================
  // REGISTER
  // ==============================

  const handleSubmit = async (e) => {

    e.preventDefault();


    const dataToSend = {

      username: formData.username,

      email: formData.email,

      password: formData.password,

      role: formData.role

    };


    // Patient

    if (formData.role === "patient") {

      dataToSend.patientDetails =
        formData.patientDetails;
        dataToSend.patientDetails.patientName=formData.username

    }


    console.log("data-to-send",dataToSend)

    // Doctor

    if (formData.role === "doctor") {

      dataToSend.doctorDetails =
        formData.doctorDetails;
          dataToSend.doctorDetails.doctorName=formData.username

    }


    console.log(
      "Sending registration data:",
      dataToSend
    );


    // ==============================
    // API CALL THROUGH REDUX
    // ==============================

    const result = await dispatch(
      registerUser(dataToSend)
    );


    // ==============================
    // SUCCESS
    // ==============================

    if (
      registerUser.fulfilled.match(result)
    ) {

      navigate("/");
          const role = result.payload.user.role;

    console.log("role:", role);

    if (role === "patient") {

      navigate("/patient");

    } else if (role === "doctor") {

      navigate("/doctor");

    }

    }

  };


  return (

    <div className="auth-page">
     
{error}
      <div className="auth-card register-card">


        <div className="auth-header">

          <div className="auth-icon">
            ✨
          </div>

          <h1>
            Create Account
          </h1>

          <p>
            Join MediCare today
          </p>

        </div>


        {error && (

          <div className="auth-error">
            {error}
          </div>

        )}


        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >


          {/* USERNAME */}

          <div className="form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* ROLE */}

          <div className="form-group">

            <label>
              Register As
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
            >

              <option value="patient">
                Patient
              </option>

              <option value="doctor">
                Doctor
              </option>

            </select>

          </div>


          {/* =========================
              PATIENT
          ========================= */}

          {formData.role === "patient" && (

            <div className="role-section">

              <h3>
                Patient Information
              </h3>


              <div className="form-group">

                <label>
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={
                    formData.patientDetails.age
                  }
                  onChange={
                    handlePatientChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Gender
                </label>

                <select
                  name="gender"
                  value={
                    formData.patientDetails.gender
                  }
                  onChange={
                    handlePatientChange
                  }
                  required
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.patientDetails.phone
                  }
                  onChange={
                    handlePatientChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={
                    formData.patientDetails.address
                  }
                  onChange={
                    handlePatientChange
                  }
                  required
                />

              </div>

            </div>

          )}


          {/* =========================
              DOCTOR
          ========================= */}

          {formData.role === "doctor" && (

            <div className="role-section">

              <h3>
                Doctor Information
              </h3>


              <div className="form-group">

                <label>
                  Specialization
                </label>

                <input
                  type="text"
                  name="specialization"
                  value={
                    formData.doctorDetails.specialization
                  }
                  onChange={
                    handleDoctorChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Qualification
                </label>

                <input
                  type="text"
                  name="qualification"
                  value={
                    formData.doctorDetails.qualification
                  }
                  onChange={
                    handleDoctorChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Experience
                </label>

                <input
                  type="number"
                  name="experience"
                  value={
                    formData.doctorDetails.experience
                  }
                  onChange={
                    handleDoctorChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.doctorDetails.phone
                  }
                  onChange={
                    handleDoctorChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Consultation Fee
                </label>

                <input
                  type="number"
                  name="consultationFee"
                  value={
                    formData.doctorDetails.consultationFee
                  }
                  onChange={
                    handleDoctorChange
                  }
                  required
                />

              </div>

            </div>

          )}


<div style={{color:"red"}}>{error}</div>
          {/* SUBMIT */}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"
            }

          </button>


        </form>


        <div className="auth-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Sign in
          </Link>

        </div>


      </div>

    </div>

  );

}


export default Register;