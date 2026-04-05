import mongoose from "mongoose";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 434a8b7 (final attendance report + offer letter)
const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["Casual", "Sick", "Earned"],
      required: true,
    },
    leaveSubType: {
      type: String,
      required: true,
    },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reason: String,
    appliedOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
<<<<<<< HEAD

export default mongoose.model("Leave", leaveSchema);
=======
const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId,ref: "Employee", required: true },
  leaveType: { type: String, enum: ["Casual", "Sick", "Earned"], default: "Casual" },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  reason: { type: String },
  appliedOn: { type: Date, default: Date.now },
}, { timestamps: true });
=======
>>>>>>> 434a8b7 (final attendance report + offer letter)

export default mongoose.model("Leave", leaveSchema);
>>>>>>> da0db0d (backend project setup)
