import { useState } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  createAppointmentSchedule
} from "../redux/slices/appointmentSlice";

import "./CreateAppointment.css";


function CreateAppointment() {

  const dispatch = useDispatch();


  const {
    loading,
    error,
    success,
    appointment
  } = useSelector(
    (state) => state.appointment
  );


  const [formData, setFormData] = useState({

    date: "",

    fromTime: "",

    endTime: ""

  });


  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value

    }));

  };


  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    const result = await dispatch(

      createAppointmentSchedule(

        formData

      )

    );


    console.log(
      "Redux result:",
      result
    );


    if (
      createAppointmentSchedule.fulfilled.match(
        result
      )
    ) {

      console.log(
        "Created appointment:",
        result.payload.data
      );

    }

  };


  return (

    <div className="create-appointment-page">

      <div className="appointment-card">


        <div className="appointment-header">

          <h1>
            Create Appointment
          </h1>

          <p>
            Set your availability for patients.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="appointment-form"
        >


          {/* DATE */}

          <div className="form-group">

            <label>
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

          </div>


          {/* TIME */}

          <div className="time-row">


            <div className="form-group">

              <label>
                From Time
              </label>

              <input
                type="time"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />

            </div>


          </div>


          {/* ERROR */}

          {error && (

            <div className="appointment-error">

              {error}

            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="appointment-success">

              Appointment schedule created successfully

            </div>

          )}


          {/* BUTTON */}

          <button
            type="submit"
            className="create-appointment-btn"
            disabled={loading}
          >

            {loading
              ? "Creating..."
              : "Create Appointment"
            }

          </button>


        </form>


      </div>

    </div>

  );

}


export default CreateAppointment;