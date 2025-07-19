import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getAllHospitals, getAllDoctors, getAllPatients } from '../utils/dataUtils';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState('patient');
  const [uniqueId, setUniqueId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!uniqueId) {
      setError('Please enter your unique ID');
      return;
    }
    let user = null;
    if (role === 'hospitalAdmin') {
      // For simplicity, hospital admins are identified by hospital unique name (simulate)
      const hospitals = getAllHospitals();
      const normalizedId = uniqueId.trim().toLowerCase();
      user = hospitals.find(h => (h.uniqueId && h.uniqueId.trim().toLowerCase() === normalizedId) || (h.id && String(h.id).trim().toLowerCase() === normalizedId));
      if (user) user.role = 'hospitalAdmin';
    } else if (role === 'doctor') {
      const doctors = getAllDoctors();
      const normalizedId = uniqueId.trim().toLowerCase();
      user = doctors.find(d => (d.uniqueId && d.uniqueId.trim().toLowerCase() === normalizedId) || (d.id && String(d.id).trim().toLowerCase() === normalizedId));
      if (user) user.role = 'doctor';
    } else if (role === 'patient') {
      const patients = getAllPatients();
      const normalizedId = uniqueId.trim().toLowerCase();
      user = patients.find(p => (p.uniqueId && p.uniqueId.trim().toLowerCase() === normalizedId) || (p.id && p.id.trim().toLowerCase() === normalizedId));
      if (user) user.role = 'patient';
    }
    if (user) {
      login(user);
      if (user.role === 'hospitalAdmin') {
        navigate('/hospital-dashboard');
      } else if (user.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (user.role === 'patient') {
        navigate('/patient-history');
      } else {
        navigate('/');
      }
    } else {
      setError('User not found. Please check your ID and role.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="hospitalAdmin">Hospital Admin</option>
          </select>
        </label>
        <br />
        <label>
          Unique ID:
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder="Enter your unique ID"
          />
        </label>
        <br />
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
