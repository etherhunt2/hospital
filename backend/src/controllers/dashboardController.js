// Mock data for dashboard controller

exports.getPatientDashboard = (req, res) => {
  res.json({ success: true, data: { message: "Patient Dashboard Mock" } });
};

exports.getPatientAppointments = (req, res) => {
  res.json({ success: true, appointments: [] });
};

exports.getPatientPayments = (req, res) => {
  res.json({ success: true, payments: [] });
};

exports.getPatientReports = (req, res) => {
  res.json({ success: true, reports: [] });
};

exports.getDoctorDashboard = (req, res) => {
  res.json({ success: true, data: { message: "Doctor Dashboard Mock" } });
};

exports.getDoctorPatients = (req, res) => {
  res.json({ success: true, patients: [] });
};

exports.getDoctorAppointments = (req, res) => {
  res.json({ success: true, appointments: [] });
};

exports.updateDoctorAppointment = (req, res) => {
  res.json({ success: true, message: "Appointment updated" });
};

exports.createDoctorReport = (req, res) => {
  res.json({ success: true, message: "Report created" });
};

exports.updateDoctorReport = (req, res) => {
  res.json({ success: true, message: "Report updated" });
};

exports.deleteDoctorReport = (req, res) => {
  res.json({ success: true, message: "Report deleted" });
};

exports.getDoctorReports = (req, res) => {
  res.json({ success: true, reports: [] });
};
