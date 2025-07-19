import React, { useState } from 'react';
import HospitalDashboard from './HospitalDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientForm from './PatientForm';

const Dashboard = () => {
  const [view, setView] = useState('hospital');

  const renderView = () => {
    switch (view) {
      case 'hospital':
        return <HospitalDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'patient':
        return <PatientForm />;
      default:
        return <HospitalDashboard />;
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <button onClick={() => { console.log('Switching to hospital'); setView('hospital'); }}>Hospital</button>
        <button onClick={() => { console.log('Switching to doctor'); setView('doctor'); }}>Doctor</button>
        <button onClick={() => { console.log('Switching to patient'); setView('patient'); }}>Patient</button>
      </nav>
      <div>{renderView()}</div>
    </div>
  );
};

export default Dashboard;
