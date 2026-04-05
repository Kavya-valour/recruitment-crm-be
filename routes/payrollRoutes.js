import express from "express";
import {
  getPayrolls,
  addPayroll,
  updatePayrollStatus,
  deletePayroll,
<<<<<<< HEAD
<<<<<<< HEAD
  generatePayslipPDF,
=======
  generatePayslipPDF, // ✅ Import added
>>>>>>> da0db0d (backend project setup)
=======
  generatePayslipPDF,
>>>>>>> 434a8b7 (final attendance report + offer letter)
} from "../controllers/payrollController.js";

const router = express.Router();

router.get("/", getPayrolls);
router.post("/", addPayroll);
router.put("/:id", updatePayrollStatus);
<<<<<<< HEAD
<<<<<<< HEAD
router.get("/:id/payslip", generatePayslipPDF);
router.delete("/:id", deletePayroll);

export default router;
=======
=======
router.get("/:id/payslip", generatePayslipPDF);
>>>>>>> 434a8b7 (final attendance report + offer letter)
router.delete("/:id", deletePayroll);

export default router;
>>>>>>> da0db0d (backend project setup)
