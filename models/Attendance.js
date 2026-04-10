import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    // ✅ Keep only ONE field (consistent with your project)
    employeeId: { type: String, required: true },

    date: { type: Date, required: true },

    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Absent",
    },

    inTime: { type: String },
    outTime: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);