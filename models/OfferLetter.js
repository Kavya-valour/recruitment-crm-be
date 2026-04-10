import mongoose from "mongoose";

const offerLetterSchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true },

    // ✅ Personal Details
    relationPrefix: { type: String }, // S/O, D/O, W/O
    fatherName: { type: String },
    employeeAddress: { type: [String], default: [] },

    designation: { type: String, required: true },
    joiningDate: { type: Date, required: true },

    // ✅ Salary breakup
    basic: { type: Number, default: 0 },
    hra: { type: Number, default: 0 },
    da: { type: Number, default: 0 },
    specialAllowance: { type: Number, default: 0 },
    offeredCtc: { type: Number, required: true },
    tds: { type: Number, default: 0 },

    // ✅ PDF
    pdfUrl: { type: String },

    // ✅ Status tracking
    status: {
      type: String,
      enum: ["Generated", "Issued", "Accepted", "Rejected"],
      default: "Generated",
    },
  },
  { timestamps: true }
);

export default mongoose.model("OfferLetter", offerLetterSchema);