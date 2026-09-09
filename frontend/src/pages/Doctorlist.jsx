import { useEffect } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  getAllDoctors
} from "../redux/slices/doctorSlice";

import "./DoctorList.css";
import { Link } from "react-router-dom";

function DoctorList() {

  const dispatch = useDispatch();


  const {
    doctors,
    loading,
    error
  } = useSelector(
    (state) => state.doctor
  );


  // =========================
  // GET DOCTORS
  // =========================

  useEffect(() => {

    dispatch(
      getAllDoctors()
    );

  }, [dispatch]);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="doctor-container">

        <h2>
          Loading doctors...
        </h2>

      </div>
    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <div className="doctor-container">

        <h2>
          Failed to load doctors
        </h2>

        <p>
          {error}
        </p>

      </div>
    );

  }


  return (

    <div className="doctor-container">

      <div className="doctor-header">

        <h1>
          Our Doctors
        </h1>

        <p>
          Find the right doctor for your
          healthcare needs.
        </p>

      </div>


      {doctors.length === 0 ? (

        <div className="no-doctors">

          <h2>
            No Doctors Found
          </h2>

        </div>

      ) : (

        <div className="doctor-grid">

          {doctors.map(
            (doctor) => (

              <div
                className="doctor-card"
                key={doctor._id}
              >

                <div className="doctor-image">

                  {doctor.image ? (

                    <img
                      src={doctor.image}
                      alt={doctor.doctorName}
                    />

                  ) : (

                    <div className="doctor-placeholder">
                      👨‍⚕️
                    </div>

                  )}

                </div>


                <div className="doctor-info">

                  <h2>
                    Dr. {doctor.doctorName}
                  </h2>


                  <p className="specialization">

                    {doctor.specialization ||
                      "General Physician"}

                  </p>


                  <p>

                    <strong>
                      Hospital:
                    </strong>{" "}

                    {doctor.hospitalName ||
                      "N/A"}

                  </p>


                  <p>

                    <strong>
                      Experience:
                    </strong>{" "}

                    {doctor.experience ||
                      "N/A"}

                  </p>


            <Link
  to={`/patient/book-appointment/${doctor._id}`}
  className="book-button"
>
  Book Appointment
</Link>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}


export default DoctorList;