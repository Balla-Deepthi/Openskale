import React, { useState, useEffect } from 'react';
import { getAllDoctors, getAppointmentsByDoctor, getRevenueByDoctor } from '../utils/dataUtils';

const DoctorDashboard = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    if (selectedDoctorId) {
      setAppointments(getAppointmentsByDoctor(selectedDoctorId));
      setTotalEarnings(getRevenueByDoctor(selectedDoctorId));
    } else {
      setAppointments([]);
      setTotalEarnings(0);
    }
  }, [selectedDoctorId]);

  const doctors = getAllDoctors();

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map((doc) => (
          <option key={doc.id} value={doc.id}>{doc.name}</option>
        ))}
      </select>

      {selectedDoctorId && (
        <>
          <h3>Total Earnings: ₹{totalEarnings}</h3>
          <h3>Total Consultations: {appointments.length}</h3>
          <h4>Consultations Details</h4>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id}>
                Hospital: {appt.hospitalId}, Date: {new Date(appt.startTime).toLocaleString()}, Fee: ₹{appt.consultationFee}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DoctorDashboard;
