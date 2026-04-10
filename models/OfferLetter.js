import mongoose from "mongoose";

const offerLetterSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    employeeName: { type: String, required: true },

    // New fields
    relationPrefix: { type: String }, // S/O, D/O, W/O
    fatherName: { type: String },
    employeeAddress: { type: [String], default: [] }, // stores array of lines

    designation: { type: String, required: true },
    joiningDate: { type: Date, required: true },

    // Salary breakup
    basic: { type: Number, default: 0 },
    hra: { type: Number, default: 0 },
    da: { type: Number, default: 0 },
    specialAllowance: { type: Number, default: 0 },
    offeredCtc: { type: Number, required: true },
    tds: { type: Number, default: 0 },

    pdfUrl: { type: String }, // Stored PDF path

    status: {
      type: String,
      enum: ["Generated", "Issued", "Accepted", "Rejected"],
      default: "Generated",
    },
  },
  { timestamps: true }
);

export default mongoose.model("OfferLetter", offerLetterSchema);
=======
  employeeName: { type: String, required: true },
  designation: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  offeredCtc: { type: Number, required: true },
  pdfUrl: { type: String },  // Path to stored PDF
  status: { type: String, default: "Generated" }, // Optional status
}, { timestamps: true });

export default mongoose.model("OfferLetter", offerLetterSchema);
>>>>>>> da0db0d (backend project setup)
