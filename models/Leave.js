import mongoose from "mongoose";

<<<<<<< HEAD
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

export default mongoose.model("Leave", leaveSchema);
>>>>>>> da0db0d (backend project setup)
