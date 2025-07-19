import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../AppLayout.css';

const Layout = () => {
  return (
    <>
      <nav>
        <NavLink to="/" end activeClassName="active">Dashboard</NavLink>
        <NavLink to="/register-hospital" activeClassName="active">Register Hospital</NavLink>
        <NavLink to="/register-doctor" activeClassName="active">Register Doctor</NavLink>
        <NavLink to="/associate-doctor" activeClassName="active">Associate Doctor</NavLink>
        <NavLink to="/register-patient" activeClassName="active">Register Patient</NavLink>
        <NavLink to="/book-appointment" activeClassName="active">Book Appointment</NavLink>
        <NavLink to="/hospital-dashboard" activeClassName="active">Hospital Dashboard</NavLink>
        <NavLink to="/doctor-dashboard" activeClassName="active">Doctor Dashboard</NavLink>
        <NavLink to="/patient-history" activeClassName="active">Patient History</NavLink>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
