import React, { useState, useEffect } from 'react';
import { addHospital, addDepartment, getAllHospitals, getDepartmentsByHospital } from '../utils/dataUtils';

const HospitalForm = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalLocation, setHospitalLocation] = useState('');
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    setHospitals(getAllHospitals());
  }, []);

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleAddHospital = (e) => {
    e.preventDefault();
    if (!hospitalName || !hospitalLocation) return alert('Please enter hospital name and location');
    const uniqueId = generateUniqueId();
    const hospital = addHospital({ name: hospitalName, location: hospitalLocation, uniqueId });
    setSelectedHospitalId(hospital.id);
    setHospitalName('');
    setHospitalLocation('');
    setDepartments([]);
    setHospitals((prevHospitals) => [...prevHospitals, hospital]);
    alert(`Hospital added successfully. Your unique ID is: ${uniqueId}`);
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!newDepartmentName || !selectedHospitalId) return alert('Select hospital and enter department name');
    const newDept = addDepartment({ name: newDepartmentName, hospitalId: selectedHospitalId });
    // Fetch updated departments after adding new one
    const updatedDepartments = getDepartmentsByHospital(selectedHospitalId);
    setDepartments(updatedDepartments);
    setNewDepartmentName('');
  };

  const handleHospitalSelect = (e) => {
    const hospitalId = e.target.value;
    setSelectedHospitalId(hospitalId);
    const deps = getDepartmentsByHospital(hospitalId);
    setDepartments(deps);
  };

  return (
    <div>
      <h2>Register Hospital</h2>
      <form onSubmit={handleAddHospital}>
        <input
          type="text"
          placeholder="Hospital Name"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={hospitalLocation}
          onChange={(e) => setHospitalLocation(e.target.value)}
          required
        />
        <button type="submit">Add Hospital</button>
      </form>

      <h3>Manage Departments</h3>
      <select onChange={handleHospitalSelect} value={selectedHospitalId || ''}>
        <option value="" disabled>Select Hospital</option>
        {hospitals.map((h) => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>

      {selectedHospitalId && (
        <form onSubmit={handleAddDepartment}>
          <input
            type="text"
            placeholder="New Department Name"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
            required
          />
          <button type="submit">Add Department</button>
        </form>
      )}

      <h4>Departments</h4>
      <ul>
        {departments.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalForm;
