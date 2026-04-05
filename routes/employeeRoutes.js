import express from "express";
import multer from "multer";
<<<<<<< HEAD
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
=======
import { protect } from "../middleware/authMiddleware.js";
>>>>>>> 434a8b7 (final attendance report + offer letter)
import {
  getEmployees,
  getEmployeeById,
  getEmployeeByLookup,
  addEmployee,
  updateEmployee,
  deleteEmployee,
<<<<<<< HEAD
>>>>>>> da0db0d (backend project setup)
=======
  exportEmployeesToExcel,
>>>>>>> 434a8b7 (final attendance report + offer letter)
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
<<<<<<< HEAD
router.get("/lookup", getEmployeeByLookup);
router.get("/:id", getEmployeeById);
router.post("/", protect, addEmployee);
=======
router.get("/:id", getEmployeeById);
router.post("/", addEmployee);
>>>>>>> da0db0d (backend project setup)
=======
router.get("/lookup", getEmployeeByLookup);
router.get("/:id", getEmployeeById);
router.post("/", protect, addEmployee);
>>>>>>> 434a8b7 (final attendance report + offer letter)

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
<<<<<<< HEAD
=======
>>>>>>> 434a8b7 (final attendance report + offer letter)
router.get("/export/excel", exportEmployeesToExcel);

export default router;
=======

export default router;
>>>>>>> da0db0d (backend project setup)
