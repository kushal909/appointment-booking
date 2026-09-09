import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";


/*
  Convert HH:mm to minutes

  "09:30" -> 570
*/
const convertToMinutes = (time) => {
  const [hours, minutes] =
    time.split(":").map(Number);

  return hours * 60 + minutes;
};


/*
  Convert minutes to HH:mm

  570 -> "09:30"
*/
const convertToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);

  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};


/*
  CREATE DOCTOR SCHEDULE

  POST /api/appointments/schedule

  Doctor only
*/
export const createAppointmentSchedule = async (
  req,
  res
) => {
  try {
    // console.log("req.body",req.body)
    const {
      date,
      fromTime,
      endTime,

    } = req.body;


    // Validation
    if (!date || !fromTime || !endTime) {
      return res.status(400).json({
        success: false,
        message:
          "date, fromTime and endTime are required"
      });
    }




    // Find doctor using logged-in user
    const doctor = await Doctor.findOne({
      userId: req.user.id
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found"
      });
    }


    // Convert times
    const start =
      convertToMinutes(fromTime);

    const end =
      convertToMinutes(endTime);


    if (
      Number.isNaN(start) ||
      Number.isNaN(end)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Time must be in HH:mm format"
      });
    }


    if (start >= end) {
      return res.status(400).json({
        success: false,
        message:
          "endTime must be greater than fromTime"
      });
    }


    // Check existing schedule
    const existing =
      await Appointment.findOne({
        doctorId: doctor._id,
        date: new Date(date)
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Schedule already exists for this date"
      });
    }


    // Generate slots
    const slots = [];

    // for (
    //   let current = start;
    //   current < end;
    //   current += duration
    // ) {

    //   const slotEnd =
    //     current + duration;

    //   if (slotEnd > end) {
    //     break;
    //   }

    //   slots.push({
    //     startTime: convertToTime(current),
    //     endTime: convertToTime(slotEnd),
    //     status: "available"
    //   });
    // }


    // Create schedule
    const appointment =
      await Appointment.create({

        doctorId: doctor._id,

        userId: req.user.id,

        date: new Date(date),

        fromTime,

        endTime,

       // slotss
      });


    return res.status(201).json({
      success: true,
      message:
        "Appointment schedule created successfully",
      data: appointment
    });

  } catch (error) {

    console.error(
      "CREATE APPOINTMENT SCHEDULE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create appointment schedule",
      error: error.message
    });
  }
};


/*
  GET MY SCHEDULES

  GET /api/appointments/my-schedules

  Doctor only
*/
export const getDoctorSchedules = async (
  req,
  res
) => {
  try {

    const doctor =
      await Doctor.findOne({
        userId: req.user.id
      });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }


    const schedules =
      await Appointment.find({
        doctorId: doctor._id
      })
        .populate(
          "doctorId",
          "doctorName specialization hospitalName"
        )
        .sort({
          date: 1
        });


    return res.status(200).json({
      success: true,
      count: schedules.length,
      data: schedules
    });

  } catch (error) {

    console.error(
      "GET DOCTOR SCHEDULE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch schedules",
      error: error.message
    });
  }
};


/*
  GET AVAILABLE SLOTS

  GET /api/appointments/available-slots
  ?doctorId=xxx&date=2026-09-01

  Patient only
*/

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};
const formatTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${String(minutes).padStart(2, "0")}`;
}
export const availableAppointmentLists =async (req,res) =>{
  try {

    const {doctorId,slotInMinutes,date}=req.body
    console.log("req.body",req.body)
    let totalTime = await Appointment.find()
  

let _id =doctorId
   
    //let availableTime  = await Appointment.findOne({doctorId,date: new Date(date)})

    const startOfDay = new Date(`${date}T00:00:00.000Z`);

const endOfDay = new Date(`${date}T23:59:59.999Z`);
console.log("doctorId",doctorId)
const availableTime = await Appointment.findOne({
doctorId,
    date: {
        $gte: startOfDay,
        $lte: endOfDay
    }
}

);
      console.log("availableTime",availableTime)

    if(availableTime == null){
      return res.status(400).json({message:"availbaleTime is not available "})
    }



    // if(avalilableTime.slots)


   let startTime =availableTime?.fromTime
  
      let endTime = availableTime.endTime


      let i =startTime

      let arr =[]
const stime = startTime;

const [hours, minutes] = stime.split(":").map(Number);

let startMinutes = hours * 60 + minutes;



const etime = endTime;

const [hourse, minutese] = etime.split(":").map(Number);

let endMinutes = hourse * 60 + minutese;


    while (startMinutes < endMinutes) {

  let slotEnd = startMinutes + Number(slotInMinutes);

  const minutesToTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
  // Don't create a slot beyond doctor's end time
  if (slotEnd > endMinutes) {
    break;
  }

  arr.push({
    // startTime: startMinutes,
    // endTime: slotEnd
    startTime: minutesToTime(startMinutes),
  endTime: minutesToTime(slotEnd)
  });

  startMinutes += Number(slotInMinutes);
}
    if(availableTime.slots.length == 0) {
   
     return res.json(arr)
    }

    else  {

let bookedSlots =availableTime.slots

let endDate = timeToMinutes(availableTime.fromTime)
let endLoop = timeToMinutes(availableTime.endTime)







let bookableSlots =[]

let startDate = timeToMinutes(bookedSlots[0].startTime)



let i =0;

while(i<bookedSlots.length){




  let mindiff = startDate -endDate


  //console.log("diff",mindiff)

let result = mindiff/slotInMinutes

if(result>0){

  let j =endDate;
  let k =0
  while(j<startDate && k< parseInt(result)){

    let obj ={
      startTime: minutesToTime(j),
      endTime:minutesToTime(j+slotInMinutes)
    }


 bookableSlots.push(obj)
    j= j+slotInMinutes


    k++
  }


}





  if(bookedSlots[i+1]?.startTime != undefined){
 startDate =timeToMinutes(bookedSlots[i+1].startTime)

  }





    endDate = timeToMinutes(bookedSlots[i].endTime)
    
   
i++

}



endDate = timeToMinutes(bookedSlots[bookedSlots.length-1].endTime)

startDate =timeToMinutes(availableTime.endTime)

  let mindiff = startDate -endDate



let result = mindiff/slotInMinutes



if(result>0){

  let j =endDate;
  let k =0
  while(j<startDate && k< parseInt(result)){

    let obj ={
      startTime: minutesToTime(j),
      endTime:minutesToTime(j+slotInMinutes)
    }

 bookableSlots.push(obj)
    j= j+slotInMinutes


    k++
  }


}
console.log("bookable-slots",bookableSlots)
res.json({message:"successfully giving available slots",bookableSlots:bookableSlots,bookedSlots:bookedSlots})
    }

  } catch(err) {
    console.log(err)
  }


}
export const bookAppointmentSlot = async (req, res) => {
  try {
    const {
      doctorId,
      date,
      startTime,
      endTime,
      patientId
    } = req.body;
const newStart = timeToMinutes(startTime);
const newEnd = timeToMinutes(endTime);

if (newStart >= newEnd) {
  return res.status(400).json({
    success: false,
    message: "Start time must be less than end time"
  });
}
    const appointment = await Appointment.findOne({
      doctorId,
      date: new Date(date)
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment schedule not found"
      });
    }



    // Check overlapping booked slots
    const isAlreadyBooked = appointment.slots.some((slot) => {

      if (slot.status !== "booked") {
        return false;
      }

      const existingStart =
        timeToMinutes(slot.startTime);

      const existingEnd =
        timeToMinutes(slot.endTime);

      return (
        newStart < existingEnd &&
        newEnd > existingStart
      );
    });

    if (isAlreadyBooked) {
      return res.status(409).json({
        success: false,
        message: "Someone is already booked for this time"
      });
    }

    // No overlap → book the slot
    // const updatedAppointment =
    //   await Appointment.findOneAndUpdate(
    //     {
    //       doctorId,
    //       date: new Date(date)
    //     },
    //     {
    //       $push: {
    //         slots: {
    //           startTime,
    //           endTime,
    //           status: "booked",
    //           patientId
    //         }
    //       }
    //     },
    //     {
    //       new: true,
    //       runValidators: true
    //     }
    //   );
    
      let arr = appointment.slots

      arr.push( {
              startTime,
              endTime,
              status: "booked",
              patientId
            })
    arr = arr.filter((slot) => {
  const st = timeToMinutes(slot.startTime);
  const et = timeToMinutes(slot.endTime);

  return st < et;
});

arr.forEach((slot) => {
  slot.startTime = formatTime(slot.startTime);
  slot.endTime = formatTime(slot.endTime);
});

arr.sort((a, b) => {
  return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
});
// console.log("sorted arr", arr);
let updatedAppointment =await Appointment.findOneAndUpdate({doctorId,date},{slots:arr})
res.json(updatedAppointment)

    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      data: updatedAppointment
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};
// export const bookAppointmentSlot = async (req, res) => {
//   try {
//     const {
//       doctorId,
//       date,
//       startTime,
//       endTime,
//       patientId
//     } = req.body;

//     if (
//       !doctorId ||
//       !date ||
//       !startTime ||
//       !endTime ||
//       !patientId
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }

//     // Find appointment and update matching slot
//       const appointment = await Appointment.findOneAndUpdate(
//       {
//         doctorId,
//         date: new Date(date)
//       },
//       {
//         $push: {
//           slots: {
//             startTime,
//             endTime,
//             status: "booked",
//             patientId
//           }
//         }
//       },
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         message: "Appointment not found"
//       });
//     }


//    // console.log("appointment",appointment)
//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         message: "Slot not available or already booked"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Appointment booked successfully",
//       appointment
//     });

//   } catch (err) {
//     console.log(err);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: err.message
//     });
//   }
// };
export const getAvailableSlots = async (
  req,
  res
) => {
  try {

    const {
      doctorId,
      date
    } = req.query;


    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message:
          "doctorId and date are required"
      });
    }


    const appointment =
      await Appointment.findOne({
        doctorId,
        date: new Date(date)
      })
        .populate(
          "doctorId",
          "doctorName specialization hospitalName consultationFee"
        );


    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "No schedule found for this doctor and date"
      });
    }


    const availableSlots =
      appointment.slots.filter(
        slot =>
          slot.status === "available"
      );


    return res.status(200).json({
      success: true,

      data: {
        appointmentId: appointment._id,

        doctor: appointment.doctorId,

        date: appointment.date,

        availableSlots
      }
    });

  } catch (error) {

    console.error(
      "GET AVAILABLE SLOTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch available slots",
      error: error.message
    });
  }
};


/*
  GET SCHEDULE BY ID

  GET /api/appointments/:id
*/
export const getAppointmentById = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const appointment =
      await Appointment.findById(id)
        .populate(
          "doctorId",
          "doctorName specialization hospitalName phoneNumber"
        );


    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment schedule not found"
      });
    }


    return res.status(200).json({
      success: true,
      data: appointment
    });

  } catch (error) {

    console.error(
      "GET APPOINTMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch appointment",
      error: error.message
    });
  }
};


/*
  DELETE SCHEDULE

  DELETE /api/appointments/:id

  Doctor only
*/
export const deleteAppointmentSchedule = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const doctor =
      await Doctor.findOne({
        userId: req.user.id
      });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }


    const appointment =
      await Appointment.findOne({
        _id: id,
        doctorId: doctor._id
      });


    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Schedule not found"
      });
    }


    const hasBookedSlots =
      appointment.slots.some(
        slot =>
          slot.status === "booked"
      );


    if (hasBookedSlots) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete a schedule containing booked slots"
      });
    }


    await Appointment.findByIdAndDelete(id);


    return res.status(200).json({
      success: true,
      message:
        "Appointment schedule deleted successfully"
    });

  } catch (error) {

    console.error(
      "DELETE APPOINTMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete appointment",
      error: error.message
    });
  }
};