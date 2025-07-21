// src/utils/localStorageUtils.js

// -------------------------
// ✅ Generic Storage Utils
// -------------------------

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// -------------------------
// ✅ Hospital Utils
// -------------------------

export const saveHospitalToStorage = (hospitals) => {
  // hospitals is expected to be an array, just save it directly
  saveToStorage("hospitals", hospitals);
};

export const getHospitalsFromStorage = () => {
  return getFromStorage("hospitals");
};

// -------------------------
// ✅ Department Utils
// -------------------------

export const saveDepartmentToStorage = (department) => {
  let departments = getFromStorage("departments");
  if (!Array.isArray(departments)) {
    departments = [];
  }
  departments.push(department);
  saveToStorage("departments", departments);
};

export const getDepartmentsFromStorage = () => {
  return getFromStorage("departments");
};

// -------------------------
// ✅ Doctor Utils (if needed)
// -------------------------

export const saveDoctorToStorage = (doctors) => {
  saveToStorage("doctors", doctors);
};

export const getDoctorsFromStorage = () => {
  return getFromStorage("doctors");
};
  
// -------------------------
// ✅ Patient Utils
// -------------------------

export const savePatientToStorage = (patient) => {
  const patients = getFromStorage("patients");
  patients.push(patient);
  saveToStorage("patients", patients);
};

export const getPatientsFromStorage = () => {
  return getFromStorage("patients");
};

// -------------------------
// ✅ Appointment Utils
// -------------------------

export function saveAppointmentToStorage(appointment) {
  const appointments = getFromStorage("appointments");
  appointments.push(appointment);
  saveToStorage("appointments", appointments);
}

export function getAppointmentsFromStorage() {
  return getFromStorage("appointments");
}
