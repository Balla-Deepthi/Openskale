import React, { useState, useEffect } from 'react';
import {
  getAllHospitals,
  getDoctorsByHospital,
  getAppointmentsByHospital,
  getDepartmentsByHospital,
  getRevenueByHospital,
  getRevenueByDoctor,
  getRevenueByDepartment,
} from '../utils/dataUtils';

const HospitalDashboard = () => {
  const [selectedHospitalId, setSelectedHospitalId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (selectedHospitalId) {
      setDoctors(getDoctorsByHospital(selectedHospitalId));
      setDepartments(getDepartmentsByHospital(selectedHospitalId));
      setAppointments(getAppointmentsByHospital(selectedHospitalId));
      setTotalRevenue(getRevenueByHospital(selectedHospitalId));
    } else {
      setDoctors([]);
      setDepartments([]);
      setAppointments([]);
      setTotalRevenue(0);
    }
  }, [selectedHospitalId]);

  const hospitals = getAllHospitals();

  return (
    <div>
      <h2>Hospital Admin Dashboard</h2>
      <select value={selectedHospitalId} onChange={(e) => setSelectedHospitalId(e.target.value)}>
        <option value="">Select Hospital</option>
        {hospitals.map((h) => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>

      {selectedHospitalId && (
        <>
          <h3>Doctors</h3>
          <ul>
            {doctors.map((doc) => (
              <li key={doc.id}>
                {doc.name} - Revenue: ₹{getRevenueByDoctor(doc.id)}
              </li>
            ))}
          </ul>

          <h3>Departments</h3>
          <ul>
            {departments.map((dep) => (
              <li key={dep.id}>
                {dep.name} - Revenue: ₹{getRevenueByDepartment(selectedHospitalId, dep.id)}
              </li>
            ))}
          </ul>

          <h3>Total Consultations: {appointments.length}</h3>
          <h3>Total Revenue: ₹{totalRevenue}</h3>
        </>
      )}
    </div>
  );
};

export default HospitalDashboard;
