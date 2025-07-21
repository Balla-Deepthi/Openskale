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
    setError('');

    if (!uniqueId.trim()) {
      setError('Please enter your unique ID');
      return;
    }

    const normalizedId = uniqueId.trim().toLowerCase();
    let user = null;

    if (role === 'hospitalAdmin') {
      const hospitals = getAllHospitals();
      console.log("Hospitals:", hospitals); // Optional: Debugging
      user = hospitals.find(h => h.uniqueId && h.uniqueId.trim().toLowerCase() === normalizedId);
      if (user) user.role = 'hospitalAdmin';
    } else if (role === 'doctor') {
      const doctors = getAllDoctors();
      user = doctors.find(d => d.uniqueId && d.uniqueId.trim().toLowerCase() === normalizedId);
      if (user) user.role = 'doctor';
    } else if (role === 'patient') {
      const patients = getAllPatients();
      user = patients.find(p => p.uniqueId && p.uniqueId.trim().toLowerCase() === normalizedId);
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
