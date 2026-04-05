import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
<<<<<<< HEAD
<<<<<<< HEAD
  employeeId: { type: String, required: true }, // ✅ only one field
=======
=======
  employee_id: { type: String },
>>>>>>> 434a8b7 (final attendance report + offer letter)
  employeeId: { type: String, required: true },
>>>>>>> da0db0d (backend project setup)
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent", "Leave"], default: "Absent" },
  inTime: { type: String },
  outTime: { type: String },
}, { timestamps: true });

<<<<<<< HEAD
<<<<<<< HEAD
export default mongoose.model("Attendance", attendanceSchema);
=======
export default mongoose  .model("Attendance", attendanceSchema);
>>>>>>> da0db0d (backend project setup)
=======
export default mongoose.model("Attendance", attendanceSchema);
>>>>>>> 434a8b7 (final attendance report + offer letter)
