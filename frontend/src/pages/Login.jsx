import { useState } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  loginUser
} from "../redux/slices/authSlice";

import {
  useNavigate,
  Link
} from "react-router-dom";

import "./Auth.css";


function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    loading,
    error
  } = useSelector(
    (state) => state.auth
  );


  const [formData, setFormData] = useState({

    email: "",
    password: "",

  });


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };


const handleSubmit = async (e) => {

  e.preventDefault();

  const result = await dispatch(
    loginUser(formData)
  );

  console.log("result", result);

  if (loginUser.fulfilled.match(result)) {

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

      <div className="auth-card">


        {/* Header */}

        <div className="auth-header">

          <div className="auth-icon">
            🔐
          </div>

          <h1>
            Welcome Back
          </h1>

          <p>
            Sign in to continue to MediCare
          </p>

        </div>


        {/* Error */}

        {error && (

          <div className="auth-error">
            {error}
          </div>

        )}


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >


          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"
            }

          </button>


        </form>


        {/* Footer */}

        <div className="auth-footer">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create an account
          </Link>

        </div>


      </div>

    </div>

  );
}


export default Login;