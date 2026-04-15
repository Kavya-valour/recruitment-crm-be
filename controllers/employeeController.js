import Employee from "../models/Employee.js";
import { validateEmployeeData } from "../utils/validators.js";
import ExcelJS from "exceljs";

// Generate sequential Employee IDs (VT000101, VT000102...)
const generateEmployeeId = async () => {
  const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });
  let nextNumber = 1;

  if (lastEmployee && lastEmployee.employee_id) {
    const numPart = parseInt(lastEmployee.employee_id.replace("VT", ""), 10);
    if (!isNaN(numPart)) nextNumber = numPart + 1;
  }

  return `VT${nextNumber.toString().padStart(6, "0")}`;
};

// ✅ Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single employee
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add employee
export const addEmployee = async (req, res) => {
  try {
    const validationErrors = validateEmployeeData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Check email
    const existing = await Employee.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate or validate employee_id
    let employee_id = req.body.employee_id;

    if (!employee_id) {
      employee_id = await generateEmployeeId();
    } else {
      const idRegex = /^VT\d{6}$/; // ✅ fixed (matches generator)
      if (!idRegex.test(employee_id)) {
        return res
          .status(400)
          .json({ message: "Employee ID must be like VT000101" });
      }

      const existingId = await Employee.findOne({ employee_id });
      if (existingId) {
        return res.status(400).json({ message: "Employee ID already exists" });
      }
    }

    const employee = new Employee({
      employee_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      designation: req.body.designation,
      department: req.body.department,
      joining_date: req.body.joining_date,
      leaving_date: req.body.leaving_date || null,
      current_ctc: req.body.current_ctc,
      status: req.body.status || "Active",
    });

    const saved = await employee.save();

    res.status(201).json({
      message: "Employee added successfully",
      employee: saved,
    });
  } catch (err) {
    console.error("Error in addEmployee:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const fields = [
      "name",
      "email",
      "phone",
      "designation",
      "department",
      "joining_date",
      "leaving_date",
      "current_ctc",
      "status",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        employee[field] = req.body[field];
      }
    });

    // ✅ Safe JSON parsing
    if (req.body.education) {
      try {
        employee.education = JSON.parse(req.body.education);
      } catch {
        return res.status(400).json({ message: "Invalid education data" });
      }
    }

    if (req.body.experience) {
      try {
        employee.experience = JSON.parse(req.body.experience);
      } catch {
        return res.status(400).json({ message: "Invalid experience data" });
      }
    }

    await employee.save();

    res.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: err.message });
  }
};

export const exportEmployeesToExcel = async (req, res) => {
  try {
    const employees = await Employee.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees");

    // ✅ Define columns
    worksheet.columns = [
      { header: "Employee ID", key: "employee_id", width: 15 },
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Department", key: "department", width: 20 },
      { header: "Designation", key: "designation", width: 20 },
      { header: "Joining Date", key: "joining_date", width: 20 },
      { header: "Status", key: "status", width: 15 },
      { header: "CTC", key: "current_ctc", width: 15 },
    ];

    // ✅ Add rows
    employees.forEach((emp) => {
      worksheet.addRow({
        employee_id: emp.employee_id,
        name: emp.name,
        email: emp.email,
        phone: emp.phone,
        department: emp.department,
        designation: emp.designation,
        joining_date: emp.joining_date
          ? emp.joining_date.toISOString().split("T")[0]
          : "",
        status: emp.status,
        current_ctc: emp.current_ctc,
      });
    });

    // ✅ Set headers for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=employees.xlsx"
    );

    // ✅ Send file
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Excel export error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getEmployeeByEmail = async (req, res) => {
  try {
    const { email, employeeId } = req.query;

    let employee = null;

    // Try by email first
    if (email) {
      employee = await Employee.findOne({
        email: new RegExp(`^${email}$`, "i"),
      });
    }

    // Fallback by employeeId
    if (!employee && employeeId) {
      employee = await Employee.findOne({ employee_id: employeeId });
    }

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.error("Lookup error:", err);
    res.status(500).json({ message: err.message });
  }
};