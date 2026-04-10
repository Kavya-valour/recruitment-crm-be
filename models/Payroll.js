import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    // ✅ Formatted ID (useful for display like VT/DEV/2025/0108)
    formattedEmployeeId: { type: String },

    month: { type: String, required: true },
    year: { type: Number, required: true },
    ctc: { type: Number, required: true },

    // ✅ Salary breakdown
    basic: { type: Number, default: 0 },
    hra: { type: Number, default: 0 },
    da: { type: Number, default: 0 },
    specialAllowance: { type: Number, default: 0 },
    employerPF: { type: Number, default: 0 },
    tds: { type: Number, default: 0 },
    absenceDeductions: { type: Number, default: 0 },

    // ✅ Totals
    totalEarnings: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },
    grossSalary: { type: Number, default: 0 },
    netSalary: { type: Number, default: 0 },

    // ✅ Status
    status: {
      type: String,
      enum: ["Generated", "Paid"],
      default: "Generated",
    },

    // ✅ Payslip PDF
    payslipUrl: { type: String },

    // ✅ Audit fields
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Payroll", payrollSchema);