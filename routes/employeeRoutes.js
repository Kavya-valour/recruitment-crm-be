import express from "express";
import multer from "multer";
<<<<<<< HEAD
import { protect } from "../middleware/authMiddleware.js";
import {
  getEmployees,
  getEmployeeById,
  getEmployeeByLookup,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  exportEmployeesToExcel,
=======
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
>>>>>>> da0db0d (backend project setup)
} from "../controllers/employeeController.js";

const router = express.Router();

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => Date.now() + "-" + file.originalname,
});
const upload = multer({ storage });

// Routes
router.get("/", getEmployees);
<<<<<<< HEAD
router.get("/lookup", getEmployeeByLookup);
router.get("/:id", getEmployeeById);
router.post("/", protect, addEmployee);
=======
router.get("/:id", getEmployeeById);
router.post("/", addEmployee);
>>>>>>> da0db0d (backend project setup)

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
<<<<<<< HEAD
router.get("/export/excel", exportEmployeesToExcel);

export default router;
=======

export default router;
>>>>>>> da0db0d (backend project setup)
