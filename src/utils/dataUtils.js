// src/utils/dataUtils.js

import {
  saveHospitalToStorage,
  getHospitalsFromStorage,
  saveDepartmentToStorage,
  getDepartmentsFromStorage,
  saveDoctorToStorage,
  getDoctorsFromStorage,
  savePatientToStorage,
  getPatientsFromStorage,
  saveAppointmentToStorage,
  getAppointmentsFromStorage,
} from './localStorageUtils';

// Utility to generate unique IDs
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// -------------------------
// Hospital Functions
// -------------------------

export const addHospital = (hospital) => {
  const hospitals = getHospitalsFromStorage();
  hospital.id = generateId();
  hospitals.push(hospital);
  saveHospitalToStorage(hospital);
  return hospital;
};

export const getAllHospitals = () => {
  return getHospitalsFromStorage();
};

// -------------------------
// Department Functions
// -------------------------

export const addDepartment = (department) => {
  const departments = getDepartmentsFromStorage();
  department.id = generateId();
  departments.push(department);
  saveDepartmentToStorage(department);
  return department;
};

export const getDepartmentsByHospital = (hospitalId) => {
  const departments = getDepartmentsFromStorage();
  return departments.filter((d) => d.hospitalId === hospitalId);
};

// -------------------------
// Doctor Functions
// -------------------------

export const addDoctor = (doctor) => {
  const doctors = getDoctorsFromStorage();
  doctor.id = generateId();
  doctors.push(doctor);
  saveDoctorToStorage(doctors);
  return doctor;
};

export const getAllDoctors = () => {
  return getDoctorsFromStorage();
};

export const getDoctorsByHospital = (hospitalId) => {
  const doctors = getDoctorsFromStorage();
  // Filter doctors associated with hospital
  return doctors.filter((doc) =>
    doc.associations && doc.associations.some((assoc) => assoc.hospitalId === hospitalId)
  );
};

// -------------------------
// Patient Functions
// -------------------------

export const addPatient = (patient) => {
  const patients = getPatientsFromStorage();
  patient.id = generateId();
  patients.push(patient);
  savePatientToStorage(patients);
  return patient;
};

export const getAllPatients = () => {
  return getPatientsFromStorage();
};

// -------------------------
// Appointment Functions
// -------------------------

export const addAppointment = (appointment) => {
  const appointments = getAppointmentsFromStorage();
  appointment.id = generateId();
  appointments.push(appointment);
  saveAppointmentToStorage(appointments);
  return appointment;
};

export const getAppointmentsByHospital = (hospitalId) => {
  const appointments = getAppointmentsFromStorage();
  return appointments.filter((appt) => appt.hospitalId === hospitalId);
};

export const getAppointmentsByDoctor = (doctorId) => {
  const appointments = getAppointmentsFromStorage();
  return appointments.filter((appt) => appt.doctorId === doctorId);
};

export const getAppointmentsByPatient = (patientId) => {
  const appointments = getAppointmentsFromStorage();
  return appointments.filter((appt) => appt.patientId === patientId);
};

// -------------------------
// Availability and Conflict Checks
// -------------------------

export const isTimeSlotAvailable = (doctorId, hospitalId, startTime, endTime) => {
  const appointments = getAppointmentsFromStorage();
  // Check if any appointment overlaps with the given time slot for the doctor
  return !appointments.some((appt) => {
    if (appt.doctorId !== doctorId) return false;
    if (appt.hospitalId !== hospitalId) return false;
    const apptStart = new Date(appt.startTime);
    const apptEnd = new Date(appt.endTime);
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);
    return (newStart < apptEnd && newEnd > apptStart);
  });
};

// -------------------------
// Revenue Calculations
// -------------------------

export const calculateRevenueSharing = (consultationFee) => {
  const doctorShare = consultationFee * 0.6;
  const hospitalShare = consultationFee * 0.4;
  return { doctorShare, hospitalShare };
};

export const getRevenueByHospital = (hospitalId) => {
  const appointments = getAppointmentsByHospital(hospitalId);
  return appointments.reduce((total, appt) => total + (appt.consultationFee || 0), 0);
};

export const getRevenueByDoctor = (doctorId) => {
  const appointments = getAppointmentsByDoctor(doctorId);
  return appointments.reduce((total, appt) => total + (appt.consultationFee || 0), 0);
};

export const getRevenueByDepartment = (hospitalId, departmentId) => {
  const appointments = getAppointmentsByHospital(hospitalId);
  // Filter appointments by department
  const filtered = appointments.filter((appt) => appt.departmentId === departmentId);
  return filtered.reduce((total, appt) => total + (appt.consultationFee || 0), 0);
};
