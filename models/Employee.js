import mongoose from "mongoose";

// 🎓 Education Schema
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institute: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  document: { type: String }, // File path (PDF/Image)
});

// 💼 Experience Schema
const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  document: { type: String },
});

// 👤 Employee Schema
const employeeSchema = new mongoose.Schema(
  {
    employee_id: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    joining_date: { type: Date, required: true },
    leaving_date: { type: Date },
    designation: { type: String },
    department: { type: String },

    // ✅ Standardized naming (to match routes)
    education: [educationSchema],
    experience: [experienceSchema],

    current_ctc: { type: Number },
    salary_breakup: {
      basic: { type: Number },
      hra: { type: Number },
      bonus: { type: Number },
      allowances: { type: Number },
    },

    status: {
      type: String,
      enum: ["Active", "Left"],
      default: "Active",
    },

    // ✅ Leave balance tracking
    leaveBalance: {
      casual: { type: Number, default: 10 },
      sick: { type: Number, default: 5 },
      earned: { type: Number, default: 7 },
    },
  },
  { timestamps: true }
);

<<<<<<< HEAD
export default mongoose.model("Employee", employeeSchema);
=======
export default mongoose.model("Employee", employeeSchema);
>>>>>>> da0db0d (backend project setup)
