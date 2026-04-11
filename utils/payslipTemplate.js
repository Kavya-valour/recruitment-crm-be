export const generatePayslipHTML = (data) => {
  const format = (n) => Number(n || 0).toLocaleString("en-IN");

  const totalEarnings =
    (data.basic || 0) +
    (data.hra || 0) +
    (data.da || 0) +
    (data.specialAllowance || 0);

  const totalDeductions =
    (data.employerPF || 0) +
    (data.tds || 0) +
    (data.absenceDeductions || 0);

  const net = totalEarnings - totalDeductions;

  return `
<html>
<head>
<style>
body {
  font-family: Arial;
  padding: 40px;
}

.logo {
  position: absolute;
  top: 30px;
  left: 50px;
  height: 60px;
}

.header {
  text-align: center;
}

.title {
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}
  
td, th {
  border: 1px solid #ccc;
  padding: 8px;
}

th {
  background: #f8f9fa;
}

.total {
  font-weight: bold;
  background: #f5f5f5;
}

.net {
  font-weight: bold;
  font-size: 16px;
}
</style>
</head>

<body>

<div style="position:relative; margin-bottom:30px;">

  ${data.logoBase64 ? `
    <img src="data:image/png;base64,${data.logoBase64}" 
         style="height:60px; position:absolute; left:0; top:0;" />
  ` : ""}

  <div style="text-align:center;">
    <h2 style="margin:0;">Valour Technologies Pvt Ltd</h2>
    <p style="margin:2px 0; font-size:12px;">
      No. 502, Vcollab, Capital Park, Image Gardens Road,<br/>
      Madhapur, Hyderabad, Telangana - 500081
    </p>
  </div>

</div>

<div style="text-align:center; font-weight:bold; font-size:18px; margin:20px 0;">
  Salary Slip - ${data.month} ${data.year}
</div>

<table>
<tr><td>Employee Name</td><td>${data.employeeName}</td></tr>
<tr><td>Designation</td><td>${data.designation}</td></tr>
<tr><td>Employee ID</td><td>${data.employeeId}</td></tr>
<tr><td>Joining Date</td><td>${data.joiningDate ? new Date(data.joiningDate).toLocaleDateString("en-IN") : "N/A"}</td></tr>
<tr><td>Work Location</td><td>${data.workLocation || "Remote"}</td></tr>
</table>

<table>
<tr>
<th>Earnings</th>
<th>Amount</th>
<th>Deductions</th>
<th>Amount</th>
</tr>

<tr>
<td>Basic</td><td>${format(data.basic)}</td>
<td>PF</td><td>${format(data.employerPF)}</td>
</tr>

<tr>
<td>HRA</td><td>${format(data.hra)}</td>
<td>TDS</td><td>${format(data.tds)}</td>
</tr>

<tr>
<td>DA</td><td>${format(data.da)}</td>
<td>Absence</td><td>${format(data.absenceDeductions)}</td>
</tr>

<tr>
<td>Special Allowance</td><td>${format(data.specialAllowance)}</td>
<td></td><td></td>
</tr>

<tr class="total">
<td>Total Earnings</td><td>${format(totalEarnings)}</td>
<td>Total Deductions</td><td>${format(totalDeductions)}</td>
</tr>

<tr class="net">
<td colspan="4">Net Salary: ₹${format(net)}</td>
</tr>

</table>

</body>
</html>
`;
};