import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";
<<<<<<< HEAD
import { validateLeaveData } from "../utils/validators.js";

/* ================================
   GET ALL LEAVES (HR / ADMIN)
================================ */
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId", "name employee_id designation");

=======

// GET all leaves (HR/Admin)
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId", "name employeeId");
>>>>>>> da0db0d (backend project setup)
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
/* ================================
   APPLY LEAVE (EMPLOYEE)
================================ */
export const applyLeave = async (req, res) => {
  try {
    const {
      employeeId,
      leaveType,
      leaveSubType,
      fromDate,
      toDate,
      reason,
    } = req.body;

    // ✅ Basic validation
    const errors = validateLeaveData({
      employeeId,
      leaveType,
      fromDate,
      toDate,
    });

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // ✅ Find employee
    const employee = await Employee.findOne({ employee_id: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // ✅ Calculate leave days
    const days =
      Math.ceil(
        (new Date(toDate) - new Date(fromDate)) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    // ✅ Check leave balance
    const leaveKey = leaveType.toLowerCase(); // casual / sick / earned
    const available = employee.leaveBalance?.[leaveKey] || 0;

    if (available < days) {
      return res.status(400).json({
        message: `Insufficient ${leaveType} leave balance`,
        available,
        requested: days,
      });
    }

    // ✅ Save leave
    const leave = new Leave({
      employeeId: employee._id,
      leaveType,
      leaveSubType,
      fromDate,
      toDate,
      reason: reason?.trim(),
      status: "Pending",
    });

    const savedLeave = await leave.save();

    res.status(201).json({
      message: "Leave application submitted successfully",
      leave: savedLeave,
    });
  } catch (error) {
    console.error("Apply Leave Error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

/* ================================
   UPDATE LEAVE STATUS (HR / ADMIN)
================================ */
=======
// Apply Leave
export const applyLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, fromDate, toDate, reason } = req.body;
    const leave = new Leave({ employeeId, leaveType, fromDate, toDate, reason });
    const saved = await leave.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Leave Status + Adjust Balance
>>>>>>> da0db0d (backend project setup)
export const updateLeave = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findById(req.params.id);
<<<<<<< HEAD

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    const employee = await Employee.findById(leave.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const leaveKey = leave.leaveType.toLowerCase();
    const days =
      Math.ceil(
        (new Date(leave.toDate) - new Date(leave.fromDate)) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    // ✅ Deduct balance on approval
    if (status === "Approved" && leave.status !== "Approved") {
      employee.leaveBalance[leaveKey] =
        (employee.leaveBalance[leaveKey] || 0) - days;

      if (employee.leaveBalance[leaveKey] < 0) {
        employee.leaveBalance[leaveKey] = 0;
      }

      await employee.save();
    }

    // ✅ Restore balance if rejected after approval
    if (status === "Rejected" && leave.status === "Approved") {
      employee.leaveBalance[leaveKey] =
        (employee.leaveBalance[leaveKey] || 0) + days;

      await employee.save();
    }

    leave.status = status;
    const updatedLeave = await leave.save();

    res.json({
      message: "Leave updated successfully",
      leave: updatedLeave,
      employee: {
        name: employee.name,
        leaveBalance: employee.leaveBalance,
      },
    });
  } catch (error) {
    console.error("Update Leave Error:", error);
=======
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    // Adjust only if status changes
    if (status === "Approved" && leave.status !== "Approved") {
      const emp = await Employee.findById(leave.employeeId);
      if (emp) {
        const leaveKey = leave.leaveType.toLowerCase();
        const validTypes = ["sick", "casual", "earned"];
        if (!validTypes.includes(leaveKey))
          return res.status(400).json({ message: `Invalid leave type: ${leave.leaveType}` });

        const days =
          (new Date(leave.toDate) - new Date(leave.fromDate)) /
            (1000 * 60 * 60 * 24) +
          1;

        const currentBalance = emp.leaveBalance?.[leaveKey] || 0;
        emp.leaveBalance[leaveKey] = Math.max(currentBalance - days, 0);

        await emp.save();
      }
    }

    // Restore if rejected after approval
    if (status === "Rejected" && leave.status === "Approved") {
      const emp = await Employee.findById(leave.employeeId);
      if (emp) {
        const leaveKey = leave.leaveType.toLowerCase();
        const days =
          (new Date(leave.toDate) - new Date(leave.fromDate)) /
            (1000 * 60 * 60 * 24) +
          1;
        emp.leaveBalance[leaveKey] += days;
        await emp.save();
      }
    }

    leave.status = status;
    const updated = await leave.save();
    const updatedEmp = await Employee.findById(leave.employeeId).select("name leaveBalance");

    res.json({ leave: updated, employee: updatedEmp });
  } catch (error) {
    console.error("Error updating leave:", error);
>>>>>>> da0db0d (backend project setup)
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
/* ================================
   DELETE LEAVE
================================ */
export const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: "Leave deleted successfully" });
=======
// Delete Leave
export const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: "Leave record deleted" });
>>>>>>> da0db0d (backend project setup)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
<<<<<<< HEAD

/* ================================
   LEAVE CALENDAR (MONTH VIEW)
================================ */
export const getLeaveCalendar = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year required" });
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const approvedLeaves = await Leave.find({
      status: "Approved",
      $or: [
        { fromDate: { $lte: end }, toDate: { $gte: start } },
      ],
    }).populate("employeeId", "name employee_id designation");

    const calendarData = {};

    approvedLeaves.forEach((leave) => {
      let d = new Date(
        Math.max(leave.fromDate, start)
      );

      const last = new Date(
        Math.min(leave.toDate, end)
      );

      while (d <= last) {
        const key = d.toISOString().split("T")[0];
        if (!calendarData[key]) calendarData[key] = [];

        calendarData[key].push({
          employeeId: leave.employeeId.employee_id,
          employeeName: leave.employeeId.name,
          designation: leave.employeeId.designation,
          leaveType: leave.leaveType,
          leaveSubType: leave.leaveSubType,
        });

        d.setDate(d.getDate() + 1);
      }
    });

    res.json({ month, year, calendarData });
  } catch (error) {
    console.error("Leave Calendar Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
=======
>>>>>>> da0db0d (backend project setup)
