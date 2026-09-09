import {
  useState
} from "react";


import {
  useDispatch,
  useSelector
} from "react-redux";


import {
  useParams
} from "react-router-dom";


import {
  getAvailableAppointmentSlots,

  clearAvailableSlots

} from "../redux/slices/appointmentSlice";


import "./AvailableAppointments.css";


function AvailableAppointments() {


  const dispatch =
    useDispatch();


  // =========================
  // GET DOCTOR ID FROM URL
  // =========================

  const {
    doctorId
  } = useParams();


  console.log(
    "doctorId:",
    doctorId
  );


  // =========================
  // DOCTORS
  // =========================

  const {
    doctors
  } = useSelector(

    (state) =>
      state.doctor

  );


  // =========================
  // APPOINTMENT
  // =========================

  const {

    bookableSlots,

    bookedSlots,

    slotsLoading,

    error

  } = useSelector(

    (state) =>
      state.appointment

  );


  // =========================
  // LOCAL STATE
  // =========================

  const [
    date,
    setDate
  ] = useState("");


  const [
    slotInMinutes,
    setSlotInMinutes
  ] = useState(30);


  const [
    selectedSlot,
    setSelectedSlot
  ] = useState(null);


  // =========================
  // FIND DOCTOR
  // =========================

  const selectedDoctor =
    doctors.find(

      (doctor) =>
        doctor._id === doctorId

    );


  console.log(
    "selectedDoctor:",
    selectedDoctor
  );


  // =========================
  // DATE CHANGE
  // =========================

  const handleDateChange =
    (e) => {

      setDate(
        e.target.value
      );


      setSelectedSlot(
        null
      );


      dispatch(
        clearAvailableSlots()
      );

    };


  // =========================
  // DURATION CHANGE
  // =========================

  const handleDurationChange =
    (e) => {

      setSlotInMinutes(

        Number(
          e.target.value
        )

      );


      setSelectedSlot(
        null
      );


      dispatch(
        clearAvailableSlots()
      );

    };


  // =========================
  // GET AVAILABLE SLOTS
  // =========================

  const handleGetSlots =
    () => {


      if (!doctorId) {

        alert(
          "Doctor ID is missing"
        );

        return;

      }


      if (!date) {

        alert(
          "Please select a date"
        );

        return;

      }


      if (!slotInMinutes) {

        alert(
          "Please select appointment duration"
        );

        return;

      }


      setSelectedSlot(
        null
      );


      console.log(
        "Sending slot request:",
        {

          doctorId:
            doctorId,

          slotInMinutes:
            slotInMinutes,

          date:
            date

        }

      );


      dispatch(

        getAvailableAppointmentSlots({

          doctorId:
            doctorId,

          slotInMinutes:
            slotInMinutes,

          date:
            date

        })

      );

    };


  // =========================
  // SELECT SLOT
  // =========================

  const handleSelectSlot =
    (slot) => {

      console.log(
        "Selected slot:",
        slot
      );


      setSelectedSlot(
        slot
      );

    };


  return (

    <div className="available-container">


      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="available-header">

        <h1>
          Book Appointment
        </h1>


        <p>
          Select a date and
          appointment duration.
        </p>

      </div>


      {/* ========================= */}
      {/* SELECTED DOCTOR */}
      {/* ========================= */}

      <div className="selected-doctor">

        <h2>
          Selected Doctor
        </h2>


        {selectedDoctor ? (

          <div className="doctor-details">


            <h3>

              Dr.{" "}

              {selectedDoctor.doctorName}

            </h3>


            <p>

              <strong>
                Specialization:
              </strong>{" "}

              {selectedDoctor.specialization ||
                "General Physician"}

            </p>


            <p>

              <strong>
                Hospital:
              </strong>{" "}

              {selectedDoctor.hospitalName ||
                "N/A"}

            </p>


            <p>

              <strong>
                Experience:
              </strong>{" "}

              {selectedDoctor.experience ||
                "N/A"}

            </p>


          </div>

        ) : (

          <p>
            Doctor information not found.
          </p>

        )}

      </div>


      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}

      <div className="appointment-form">


        {/* ========================= */}
        {/* DATE */}
        {/* ========================= */}

        <div className="form-group">

          <label>
            Select Date
          </label>


          <input

            type="date"

            value={
              date
            }

            onChange={
              handleDateChange
            }

          />

        </div>


        {/* ========================= */}
        {/* DURATION */}
        {/* ========================= */}

        <div className="form-group">

          <label>
            Appointment Duration
          </label>


          <select

            value={
              slotInMinutes
            }

            onChange={
              handleDurationChange
            }

          >

            <option value={15}>
              15 Minutes
            </option>


            <option value={30}>
              30 Minutes
            </option>


            <option value={45}>
              45 Minutes
            </option>


            <option value={60}>
              60 Minutes
            </option>


            <option value={90}>
              90 Minutes
            </option>

          </select>

        </div>


        {/* ========================= */}
        {/* CHECK BUTTON */}
        {/* ========================= */}

        <button

          className="get-slots-button"

          onClick={
            handleGetSlots
          }

          disabled={
            slotsLoading
          }

        >

          {slotsLoading

            ? "Checking..."

            : "Check Available Slots"

          }

        </button>


      </div>


      {/* ========================= */}
      {/* ERROR */}
      {/* ========================= */}

      {error && (

        <div className="error-message">

          {error}

        </div>

      )}


      {/* ========================= */}
      {/* BOOKABLE SLOTS */}
      {/* ========================= */}

      {!slotsLoading &&

        bookableSlots.length > 0 && (

          <div className="slots-container">


            <h2>
              Available Slots
            </h2>


            <div className="slots-grid">


              {bookableSlots.map(

                (slot, index) => (

                  <button

                    key={index}

                    className={

                      `slot-button ${

                        selectedSlot === slot

                          ? "selected"

                          : ""

                      }`

                    }

                    onClick={() =>

                      handleSelectSlot(
                        slot
                      )

                    }

                  >

                    <span>
                      {slot.startTime}
                    </span>


                    <span>
                      {" - "}
                    </span>


                    <span>
                      {slot.endTime}
                    </span>


                  </button>

                )

              )}


            </div>


          </div>

        )}


      {/* ========================= */}
      {/* BOOKED SLOTS */}
      {/* ========================= */}

      {!slotsLoading &&

        bookedSlots.length > 0 && (

          <div className="slots-container">


            <h2>
              Booked Slots
            </h2>


            <div className="slots-grid">


              {bookedSlots.map(

                (slot, index) => (

                  <button

                    key={index}

                    className="slot-button booked"

                    disabled

                  >

                    <span>
                      {slot.startTime}
                    </span>


                    <span>
                      {" - "}
                    </span>


                    <span>
                      {slot.endTime}
                    </span>


                  </button>

                )

              )}


            </div>


          </div>

        )}


      {/* ========================= */}
      {/* NO SLOTS */}
      {/* ========================= */}

      {!slotsLoading &&

        date &&

        bookableSlots.length === 0 &&

        !error && (

          <div className="no-slots">

            <h3>
              No Available Slots
            </h3>


            <p>

              There are no available
              appointments for the
              selected date.

            </p>

          </div>

        )}


      {/* ========================= */}
      {/* SELECTED SLOT */}
      {/* ========================= */}

      {selectedSlot && (

        <div className="selected-appointment">


          <h2>
            Selected Appointment
          </h2>


          <div className="selected-details">


            <p>

              <strong>
                Doctor:
              </strong>{" "}

              Dr.{" "}

              {selectedDoctor?.doctorName ||
                "N/A"}

            </p>


            <p>

              <strong>
                Specialization:
              </strong>{" "}

              {selectedDoctor?.specialization ||
                "N/A"}

            </p>


            <p>

              <strong>
                Date:
              </strong>{" "}

              {date}

            </p>


            <p>

              <strong>
                Time:
              </strong>{" "}

              {selectedSlot.startTime}

              {" - "}

              {selectedSlot.endTime}

            </p>


            <p>

              <strong>
                Duration:
              </strong>{" "}

              {slotInMinutes}

              {" "}

              Minutes

            </p>


          </div>


          {/* ========================= */}
          {/* CONFIRM BOOKING */}
          {/* ========================= */}

          <button

            className="confirm-booking-button"

          >

            Confirm Booking

          </button>


        </div>

      )}


    </div>

  );

}


export default AvailableAppointments;