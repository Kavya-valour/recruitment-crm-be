import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
<<<<<<< HEAD
  role: { type: String, enum: ["admin", "hr", "employee"], default: "hr" },
  employeeId: { type: String }, // Link to Employee record (VT####)
=======
  role: { type: String, enum: ["admin", "hr"], default: "hr" },
>>>>>>> da0db0d (backend project setup)
=======
  role: { type: String, enum: ["admin", "hr", "employee"], default: "hr" },
  employeeId: { type: String }, // Link to Employee record (VT####)
>>>>>>> 434a8b7 (final attendance report + offer letter)
}, { timestamps: true });

export default mongoose.model("User", userSchema);