import express from "express";
<<<<<<< HEAD
<<<<<<< HEAD
import Leave from "../models/Leave.js";
import { getLeaves, applyLeave, updateLeave, deleteLeave, getLeaveCalendar } from "../controllers/leaveController.js";
=======
import { getLeaves, applyLeave, updateLeave, deleteLeave } from "../controllers/leaveController.js";
>>>>>>> da0db0d (backend project setup)
=======
import Leave from "../models/Leave.js";
import { getLeaves, applyLeave, updateLeave, deleteLeave, getLeaveCalendar } from "../controllers/leaveController.js";
>>>>>>> 434a8b7 (final attendance report + offer letter)

const router = express.Router();

// Existing routes
router.get("/", getLeaves);
router.post("/", applyLeave);
router.put("/:id", updateLeave);
router.delete("/:id", deleteLeave);

<<<<<<< HEAD
<<<<<<< HEAD
// Leave calendar route
router.get("/calendar/data", getLeaveCalendar);

=======
>>>>>>> da0db0d (backend project setup)
=======
// Leave calendar route
router.get("/calendar/data", getLeaveCalendar);

>>>>>>> 434a8b7 (final attendance report + offer letter)
// ✅ Add this new route
router.get("/:id", async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate("employeeId", "name employeeId");
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> da0db0d (backend project setup)
