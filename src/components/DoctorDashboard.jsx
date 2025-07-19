import React, { useState, useEffect } from 'react';
import { getAllDoctors, getAppointmentsByDoctor, getRevenueByDoctor, getDoctorEarningsByHospital } from '../utils/dataUtils';

const DoctorDashboard = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [earningsByHospital, setEarningsByHospital] = useState({});

  useEffect(() => {
    if (selectedDoctorId) {
      setAppointments(getAppointmentsByDoctor(selectedDoctorId));
      setTotalEarnings(getRevenueByDoctor(selectedDoctorId));
      setEarningsByHospital(getDoctorEarningsByHospital(selectedDoctorId));
    } else {
      setAppointments([]);
      setTotalEarnings(0);
      setEarningsByHospital({});
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
          <h4>Earnings by Hospital</h4>
          <ul>
            {Object.entries(earningsByHospital).map(([hospitalId, earnings]) => (
              <li key={hospitalId}>
                Hospital ID: {hospitalId} - Earnings: ₹{earnings.toFixed(2)}
              </li>
            ))}
          </ul>
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
