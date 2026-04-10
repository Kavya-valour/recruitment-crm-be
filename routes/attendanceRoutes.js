import express from "express";
import multer from "multer";
<<<<<<< HEAD
import {
  addAttendance,
  getAttendance,
  uploadCsv,
  updateAttendance,
  getAttendanceReport,
  exportAttendanceReportExcel,
} from "../controllers/attendanceController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
=======
import { addAttendance, getAttendance, uploadCsv } from "../controllers/attendanceController.js";
>>>>>>> da0db0d (backend project setup)

const router = express.Router();
const upload = multer({ dest: "uploads/" });

<<<<<<< HEAD
// ✅ BASIC ROUTE
router.get("/", getAttendance);

// ✅ REPORT ROUTES (KEEP ABOVE DYNAMIC ROUTES)
router.get("/report", protect, authorize("admin", "hr"), getAttendanceReport);
router.get("/report/export", protect, authorize("admin", "hr"), exportAttendanceReportExcel);

// ✅ CREATE
router.post("/", protect, authorize("employee", "admin", "hr"), addAttendance);

// ✅ UPLOAD
router.post(
  "/upload",
  protect,
  authorize("admin", "hr"),
  upload.single("file"),
  uploadCsv
);

// ❗ ALWAYS KEEP PARAM ROUTES LAST
router.put("/:id", protect, authorize("admin", "hr"), updateAttendance);

export default router;
=======
router.get("/", getAttendance);
router.post("/", addAttendance);           // Manual
router.post("/upload", upload.single("file"), uploadCsv);  // CSV

export default router;
>>>>>>> da0db0d (backend project setup)
