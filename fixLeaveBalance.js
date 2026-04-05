import mongoose from "mongoose";
import dotenv from "dotenv";
import Employee from "./models/Employee.js";

dotenv.config();

const fixLeaveBalances = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Update all employees without proper leave balance
    const result = await Employee.updateMany(
      {
        $or: [
          { leaveBalance: { $exists: false } },
          { "leaveBalance.casual": { $exists: false } },
          { "leaveBalance.sick": { $exists: false } },
          { "leaveBalance.earned": { $exists: false } }
        ]
      },
      {
        $set: {
          "leaveBalance.casual": 10,
          "leaveBalance.sick": 5,
          "leaveBalance.earned": 7
        }
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} employees with default leave balance`);

    // Show current state
    const employees = await Employee.find({}, "employee_id name leaveBalance");
    console.log("\nCurrent Leave Balances:");
    employees.forEach(emp => {
      console.log(`${emp.employee_id} (${emp.name}):`, emp.leaveBalance);
    });

    await mongoose.connection.close();
    console.log("\n✅ Done!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

fixLeaveBalances();
