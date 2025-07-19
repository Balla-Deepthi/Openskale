import React, { useState } from 'react';
import {
  addHospital,
  addDoctor,
  addPatient,
  getAllHospitals,
  getAllDoctors,
  getAllPatients,
} from '../utils/dataUtils';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    qualifications: '',
    specializations: '',
    experience: '',
    gender: '',
    dob: '',
    uniqueId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.name || !formData.uniqueId) {
      setError('Name and Unique ID are required');
      return;
    }
    if (role === 'hospitalAdmin' && !formData.location) {
      setError('Location is required for Hospital Admin');
      return;
    }
    if (role === 'doctor' && (!formData.qualifications || !formData.specializations || !formData.experience)) {
      setError('Qualifications, Specializations, and Experience are required for Doctor');
      return;
    }
    if (role === 'patient' && (!formData.gender || !formData.dob)) {
      setError('Gender and Date of Birth are required for Patient');
      return;
    }

    // Check for duplicate uniqueId
    let existingUser = null;
    if (role === 'hospitalAdmin') {
      existingUser = getAllHospitals().find(h => h.uniqueId === formData.uniqueId);
    } else if (role === 'doctor') {
      existingUser = getAllDoctors().find(d => d.uniqueId === formData.uniqueId);
    } else if (role === 'patient') {
      existingUser = getAllPatients().find(p => p.uniqueId === formData.uniqueId);
    }
    if (existingUser) {
      setError('User with this Unique ID already exists');
      return;
    }

    if (role === 'hospitalAdmin') {
      addHospital({
        name: formData.name,
        location: formData.location,
        uniqueId: formData.uniqueId,
      });
    } else if (role === 'doctor') {
      addDoctor({
        name: formData.name,
        qualifications: formData.qualifications,
        specializations: formData.specializations.split(',').map(s => s.trim()),
        experience: formData.experience,
        uniqueId: formData.uniqueId,
        associations: [],
      });
    } else if (role === 'patient') {
      addPatient({
        name: formData.name,
        gender: formData.gender,
        dob: formData.dob,
        uniqueId: formData.uniqueId,
      });
    }
    setSuccess('Registration successful! You can now login.');
    setFormData({
      name: '',
      location: '',
      qualifications: '',
      specializations: '',
      experience: '',
      gender: '',
      dob: '',
      uniqueId: '',
    });
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
          Name:
          <input name="name" type="text" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        {role === 'hospitalAdmin' && (
          <>
            <label>
              Location:
              <input name="location" type="text" value={formData.location} onChange={handleChange} />
            </label>
            <br />
          </>
        )}
        {role === 'doctor' && (
          <>
            <label>
              Qualifications:
              <input name="qualifications" type="text" value={formData.qualifications} onChange={handleChange} />
            </label>
            <br />
            <label>
              Specializations (comma separated):
              <input name="specializations" type="text" value={formData.specializations} onChange={handleChange} />
            </label>
            <br />
            <label>
              Years of Experience:
              <input name="experience" type="number" value={formData.experience} onChange={handleChange} />
            </label>
            <br />
          </>
        )}
        {role === 'patient' && (
          <>
            <label>
              Gender:
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </label>
            <br />
            <label>
              Date of Birth:
              <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
            </label>
            <br />
          </>
        )}
        <label>
          Unique ID (Aadhar, Passport, etc.):
          <input name="uniqueId" type="text" value={formData.uniqueId} onChange={handleChange} />
        </label>
        <br />
        {error && <p style={{color: 'red'}}>{error}</p>}
        {success && <p style={{color: 'green'}}>{success}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Registration;
