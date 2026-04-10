import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
<<<<<<< HEAD
  formattedEmployeeId: { type: String }, // VT/DEV/2025/0108
  month: { type: String, required: true },
  year: { type: Number, required: true },
  ctc: { type: Number, required: true },

  // Auto-calculated salary fields
  basic: { type: Number, default: 0 },
  hra: { type: Number, default: 0 },
  da: { type: Number, default: 0 },
  specialAllowance: { type: Number, default: 0 },
  employerPF: { type: Number, default: 0 },
  tds: { type: Number, default: 0 },
  absenceDeductions: { type: Number, default: 0 },

  totalEarnings: { type: Number, default: 0 },
  totalDeductions: { type: Number, default: 0 },
  grossSalary: { type: Number, default: 0 },
  netSalary: { type: Number, default: 0 },

  status: { type: String, enum: ["Generated", "Paid"], default: "Generated" },
  payslipUrl: { type: String }, // optional PDF link

  // Optional audit fields
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Payroll", payrollSchema);
=======
  month: { type: String, required: true },
  year: { type: Number, required: true },
  basic: { type: Number, default: 0 },
  hra: { type: Number, default: 0 },
  allowances: { type: Number, default: 0 },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  grossSalary: { type: Number },
  netSalary: { type: Number },
  status: { type: String, enum: ["Generated", "Paid"], default: "Generated" },
  payslipUrl: { type: String }, // optional PDF link
}, { timestamps: true });

export default mongoose.model("Payroll", payrollSchema);
>>>>>>> da0db0d (backend project setup)
