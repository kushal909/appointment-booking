import { useEffect } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  getDoctorBookings
} from "../redux/slices/bookingSlice";

import "./DoctorBookings.css";


function DoctorBookings() {

  const dispatch = useDispatch();


  const {
    bookings,
    loading,
    error,
    success
  } = useSelector(
    (state) => state.booking
  );


  // =========================
  // FETCH BOOKINGS
  // =========================

  useEffect(() => {

    dispatch(
      getDoctorBookings()
    );

  }, [dispatch]);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="bookings-container">

        <h2>
          Loading bookings...
        </h2>

      </div>
    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <div className="bookings-container">

        <h2>
          Error
        </h2>

        <p>
          {error}
        </p>

      </div>
    );

  }


  // =========================
  // UI
  // =========================

  return (

    <div className="bookings-container">

      <div className="bookings-header">

        <h1>
          My Bookings
        </h1>

        <span>
          Total: {bookings.length}
        </span>

      </div>


      {bookings.length === 0 ? (

        <div className="no-bookings">

          <h2>
            No Bookings
          </h2>

          <p>
            No patients have booked
            your appointments yet.
          </p>

        </div>

      ) : (

        <div className="bookings-list">

          {bookings.map(
            (booking) => (

              <div
                className="booking-card"
                key={booking._id}
              >

                {/* ================= */}
                {/* PATIENT DETAILS */}
                {/* ================= */}

                <div className="booking-section">

                  <h3>
                    Patient Details
                  </h3>

                  <p>
                    <strong>
                      Name:
                    </strong>{" "}

                    {booking.patientId?.name ||
                      "N/A"}
                  </p>


                  <p>
                    <strong>
                      Email:
                    </strong>{" "}

                    {booking.patientId?.email ||
                      "N/A"}
                  </p>


                  <p>
                    <strong>
                      Mobile:
                    </strong>{" "}

                    {booking.patientId
                      ?.mobileNumber ||
                      "N/A"}
                  </p>

                </div>


                {/* ================= */}
                {/* APPOINTMENT */}
                {/* ================= */}

                <div className="booking-section">

                  <h3>
                    Appointment Details
                  </h3>


                  <p>
                    <strong>
                      Date:
                    </strong>{" "}

                    {booking.date
                      ? new Date(
                          booking.date
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>


                  <p>
                    <strong>
                      Time:
                    </strong>{" "}

                    {booking.startTime ||
                      "N/A"}

                    {" - "}

                    {booking.endTime ||
                      "N/A"}
                  </p>

                </div>


                {/* ================= */}
                {/* STATUS */}
                {/* ================= */}

                <div className="booking-status">

                  <h3>
                    Status
                  </h3>

                  <span
                    className={
                      `status ${
                        booking.status
                          ?.toLowerCase() ||
                        "booked"
                      }`
                    }
                  >
                    {booking.status ||
                      "Booked"}
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}


export default DoctorBookings;