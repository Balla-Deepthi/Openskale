import React, { useState } from 'react';
import { addPatient } from '../utils/dataUtils';

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPatient(patient);
    alert('Patient information submitted: ' + JSON.stringify(patient));
    setPatient({
      name: '',
      age: '',
      gender: '',
      condition: '',
    });
  };

  return (
    <div>
      <h2>Patient Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={patient.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age: </label>
          <input name="age" type="number" value={patient.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender: </label>
          <select name="gender" value={patient.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Condition: </label>
          <input name="condition" value={patient.condition} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatientForm;
