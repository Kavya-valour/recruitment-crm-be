import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    // ✅ ROLE (latest version with employee support)
    role: {
      type: String,
      enum: ["admin", "hr", "employee"],
      default: "hr",
    },

    // ✅ Link to Employee (optional)
    employeeId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);