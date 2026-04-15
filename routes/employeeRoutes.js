import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import {
  getEmployees,
  getEmployeeByEmail,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  exportEmployeesToExcel,
} from "../controllers/employeeController.js";

const router = express.Router();

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => Date.now() + "-" + file.originalname,
});
const upload = multer({ storage });

// Routes
router.get("/lookup", getEmployeeByEmail);
router.get("/", getEmployees);

router.get("/:id", getEmployeeById);

// ✅ Protect add employee
router.post("/", protect, addEmployee);

// ✅ Update employee with education & experience file support
router.put(
  "/:id",
  upload.fields([
    { name: "education", maxCount: 10 },
    { name: "experience", maxCount: 10 },
  ]),
  updateEmployee
);

router.delete("/:id", deleteEmployee);

// ✅ Export
router.get("/export/excel", exportEmployeesToExcel);

export default router;