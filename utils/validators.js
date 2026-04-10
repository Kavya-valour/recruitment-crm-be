export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidDate = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
};

export const isPositiveNumber = (num) => {
  return typeof num === "number" && num >= 0;
};

export const isValidPhone = (phone) => {
  const re = /^[\+]?[0-9][\d]{7,15}$/;
  return re.test(phone);
};

export const isValidCTC = (ctc) => {
  return isPositiveNumber(ctc) && ctc >= 10000 && ctc <= 10000000;
};

export const isValidEmployeeId = (id) => {
  const re = /^VT\d{6}$/;
  return re.test(id);
};

export const isValidTime = (timeStr) => {
  const re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return re.test(timeStr);
};

export const isValidLeaveType = (type) => {
  return ["Casual", "Sick", "Earned"].includes(type);
};

export const isValidAttendanceStatus = (status) => {
  return ["Present", "Absent", "Leave"].includes(status);
};

export const isValidEmployeeStatus = (status) => {
  return ["Active", "Left"].includes(status);
};

/* ================= EMPLOYEE ================= */
export const validateEmployeeData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!isValidEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push("Invalid phone number format");
  }

  if (!isValidCTC(data.current_ctc)) {
    errors.push("CTC must be between 10,000 and 10,000,000");
  }

  if (!data.joining_date || !isValidDate(data.joining_date)) {
    errors.push("Valid joining date is required");
  }

  if (data.leaving_date && !isValidDate(data.leaving_date)) {
    errors.push("Invalid leaving date format");
  }

  if (data.status && !isValidEmployeeStatus(data.status)) {
    errors.push("Status must be 'Active' or 'Left'");
  }

  return errors;
};

/* ================= ATTENDANCE ================= */
export const validateAttendanceData = (data) => {
  const errors = [];

  if (!data.employee_id || !isValidEmployeeId(data.employee_id)) {
    errors.push("Valid employee ID is required");
  }

  if (!data.date || !isValidDate(data.date)) {
    errors.push("Valid date is required");
  }

  if (!isValidAttendanceStatus(data.status)) {
    errors.push("Invalid attendance status");
  }

  if (data.inTime && !isValidTime(data.inTime)) {
    errors.push("Invalid in-time format (HH:MM)");
  }

  if (data.outTime && !isValidTime(data.outTime)) {
    errors.push("Invalid out-time format (HH:MM)");
  }

  return errors;
};

/* ================= LEAVE ================= */
export const validateLeaveData = (data) => {
  const errors = [];

  if (!data.employee_id || !isValidEmployeeId(data.employee_id)) {
    errors.push("Valid employee ID is required");
  }

  if (!isValidLeaveType(data.leaveType)) {
    errors.push("Invalid leave type");
  }

  if (!data.fromDate || !isValidDate(data.fromDate)) {
    errors.push("Valid from date is required");
  }

  if (!data.toDate || !isValidDate(data.toDate)) {
    errors.push("Valid to date is required");
  }

  if (new Date(data.fromDate) > new Date(data.toDate)) {
    errors.push("From date cannot be after to date");
  }

  return errors;
};

/* ================= PAYROLL ================= */
export const validatePayrollData = (data) => {
  const errors = [];

  if (!data.employee_id) {
    errors.push("Employee ID is required");
  }

  if (!data.month || !data.year) {
    errors.push("Month and year are required");
  }

  if (!isValidCTC(data.ctc)) {
    errors.push("Valid CTC is required");
  }

  return errors;
};