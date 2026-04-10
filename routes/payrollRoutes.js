import express from "express";
import {
  getPayrolls,
  addPayroll,
  updatePayrollStatus,
  deletePayroll,
  generatePayslipPDF,
} from "../controllers/payrollController.js";

const router = express.Router();

// ✅ GET ALL PAYROLLS
router.get("/", getPayrolls);

// ✅ ADD PAYROLL
router.post("/", addPayroll);

// ✅ UPDATE STATUS
router.put("/:id", updatePayrollStatus);

// ✅ GENERATE PAYSLIP (KEEP ABOVE DELETE)
router.get("/:id/payslip", generatePayslipPDF);

// ✅ DELETE
router.delete("/:id", deletePayroll);

export default router;