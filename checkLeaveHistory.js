import mongoose from "mongoose";
import dotenv from "dotenv";
import Employee from "./models/Employee.js";
import Leave from "./models/Leave.js";

dotenv.config();

const checkLeaveHistory = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Find Kavya BM
    const employee = await Employee.findOne({ employee_id: "VT000105" });
    console.log(`\n👤 Employee: ${employee.name} (${employee.employee_id})`);
    console.log(`Leave Balance:`, employee.leaveBalance);

    // Find all leaves for this employee
    const leaves = await Leave.find({ employeeId: employee._id })
      .sort({ createdAt: -1 });

    console.log(`\n📋 Leave Records (${leaves.length} total):`);
    leaves.forEach((leave, i) => {
      const days = Math.ceil((new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)) + 1;
      console.log(`${i + 1}. ${leave.leaveType} (${days} days) - ${leave.status}`);
      console.log(`   From: ${leave.fromDate.toISOString().split('T')[0]} To: ${leave.toDate.toISOString().split('T')[0]}`);
      console.log(`   Reason: ${leave.reason || 'N/A'}`);
    });

    // Reset earned leave to 7 for VT000105
    employee.leaveBalance.earned = 7;
    await employee.save();
    console.log(`\n✅ Reset earned leave balance to 7`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkLeaveHistory();
