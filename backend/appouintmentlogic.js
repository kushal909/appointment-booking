      console.log("slots",availableTime )

      console.log("slotin minutes",slotInMinutes)

      let arr = availableTime.slots
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
console.log("sorted arr", arr);
let updatedAppointment =await Appointment.findOneAndUpdate({doctorId,date},{slots:arr})
res.json(updatedAppointment)