import express from "express";
import {
  getPayrolls,
  addPayroll,
  updatePayrollStatus,
  deletePayroll,
<<<<<<< HEAD
  generatePayslipPDF,
=======
  generatePayslipPDF, // ✅ Import added
>>>>>>> da0db0d (backend project setup)
} from "../controllers/payrollController.js";

const router = express.Router();

router.get("/", getPayrolls);
router.post("/", addPayroll);
router.put("/:id", updatePayrollStatus);
<<<<<<< HEAD
router.get("/:id/payslip", generatePayslipPDF);
router.delete("/:id", deletePayroll);

export default router;
=======
router.delete("/:id", deletePayroll);
router.get("/:id/payslip", generatePayslipPDF); // ✅ Add route

export default router;
>>>>>>> da0db0d (backend project setup)
