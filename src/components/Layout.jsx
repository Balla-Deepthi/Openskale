import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../AppLayout.css';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav>
        {user ? (
          <>
            <NavLink to="/" end>Dashboard</NavLink>
            {user.role === 'hospitalAdmin' && (
              <>
                <NavLink to="/register-hospital">Register Hospital</NavLink>
                <NavLink to="/hospital-dashboard">Hospital Dashboard</NavLink>
              </>
            )}
            {user.role === 'doctor' && (
              <>
                <NavLink to="/register-doctor">Register Doctor</NavLink>
                <NavLink to="/associate-doctor">Associate Doctor</NavLink>
                <NavLink to="/doctor-dashboard">Doctor Dashboard</NavLink>
              </>
            )}
            {user.role === 'patient' && (
              <>
                <NavLink to="/book-appointment">Book Appointment</NavLink>
                <NavLink to="/patient-history">Patient History</NavLink>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
