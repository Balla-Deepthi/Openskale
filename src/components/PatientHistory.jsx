import React, { useState } from 'react';
import { getAppointmentsByPatient } from '../utils/dataUtils';

const PatientHistory = () => {
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);

  const handleSearch = () => {
    if (!patientId) return alert('Please enter patient unique ID');
    const appts = getAppointmentsByPatient(patientId);
    setAppointments(appts);
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

      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              Hospital: {appt.hospitalId}, Doctor: {appt.doctorId}, Date: {new Date(appt.startTime).toLocaleString()}, Fee: ₹{appt.consultationFee}
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
