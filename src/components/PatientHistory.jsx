import React, { useState } from 'react';

import { getAppointmentsByPatient, getAllHospitals, getAllDoctors, getDepartmentsByHospital } from '../utils/dataUtils';

const PatientHistory = () => {
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  React.useEffect(() => {
    setHospitals(getAllHospitals());
    setDoctors(getAllDoctors());
  }, []);

  const handleSearch = () => {
    if (!patientId) return alert('Please enter patient unique ID');
    console.log('Searching appointments for patientId:', patientId);
    const appts = getAppointmentsByPatient(patientId);
    console.log('Appointments found:', appts);

    // Enrich appointments with hospital, doctor, and department names
    const enriched = appts.map((appt) => {
      const hospital = hospitals.find((h) => h.id === appt.hospitalId);
      const doctor = doctors.find((d) => d.id === appt.doctorId);
      const departments = hospital ? getDepartmentsByHospital(hospital.id) : [];
      const department = departments.find((dep) => dep.id === appt.departmentId);
      return {
        ...appt,
        hospitalName: hospital ? hospital.name : appt.hospitalId,
        doctorName: doctor ? doctor.name : appt.doctorId,
        departmentName: department ? department.name : appt.departmentId,
      };
    });

    setAppointments(enriched);
  };


  const logAllAppointments = () => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    console.log('All appointments in localStorage:', allAppointments);
  };

  return (
    <div>
      <h2>Patient Consultation History</h2>
      <input
        type="text"
        placeholder="Enter Patient Unique ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={logAllAppointments}>Log All Appointments</button>

      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              Hospital: {appt.hospitalName || appt.hospitalId}, Doctor: {appt.doctorName || appt.doctorId}, Department: {appt.departmentName || appt.departmentId}, Date: {new Date(appt.startTime).toLocaleString()}, Fee: ₹{appt.consultationFee}
            </li>
          ))}
        </ul>
      ) : (
        <p>No consultation records found.</p>
      )}
    </div>
  );
};


export default PatientHistory;
