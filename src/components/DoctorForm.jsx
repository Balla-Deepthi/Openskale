import React, { useState, useEffect } from 'react';
import { addDoctor, getAllHospitals, getDepartmentsByHospital } from '../utils/dataUtils';

const DoctorForm = () => {
  const [name, setName] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [consultationFee, setConsultationFee] = useState('');
  const [associations, setAssociations] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const hospitalsData = getAllHospitals();
    console.log('Loaded hospitals in DoctorForm:', hospitalsData);
    setHospitals(hospitalsData);
  }, []);

  useEffect(() => {
    if (hospitalId) {
      const deps = getDepartmentsByHospital(hospitalId);
      setDepartments(deps);
    } else {
      setDepartments([]);
    }
  }, [hospitalId]);

  const handleAddAvailability = () => {
    const newSlot = {
      hospitalId,
      startTime: '',
      endTime: '',
    };
    setAvailability([...availability, newSlot]);
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !qualifications || !yearsOfExperience || selectedSpecializations.length === 0) {
      return alert('Please fill all required fields');
    }
    const doctor = {
      name,
      qualifications,
      specializations: selectedSpecializations,
      yearsOfExperience,
      associations: [
        {
          hospitalId,
          availability,
          consultationFee: parseFloat(consultationFee),
        },
      ],
    };
    console.log('Registering doctor:', doctor);
    const savedDoctor = addDoctor(doctor);
    console.log('Saved doctor:', savedDoctor);
    alert('Doctor registered successfully');
    // Reset form
    setName('');
    setQualifications('');
    setSelectedSpecializations([]);
    setYearsOfExperience('');
    setHospitalId('');
    setAvailability([]);
    setConsultationFee('');
  };

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    setSelectedSpecializations(
      selectedSpecializations.includes(value)
        ? selectedSpecializations.filter((s) => s !== value)
        : [...selectedSpecializations, value]
    );
  };

  return (
    <div>
      <h2>Register Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Qualifications"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Years of Experience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          required
        />

        <h4>Select Hospital to Associate</h4>
        <select value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} required>
          <option value="">Select Hospital</option>
          {hospitals.map((h) => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>

        {hospitalId && (
          <>
            <h4>Select Specializations (Departments)</h4>
            <select
              value={selectedSpecializations[0] || ''}
              onChange={(e) => setSelectedSpecializations([e.target.value])}
              required
            >
              <option value="" disabled>Select Department</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.name}>
                  {dep.name}
                </option>
              ))}
            </select>

            <h4>Set Availability</h4>
            {availability.map((slot, index) => (
              <div key={index}>
                <input
                  type="datetime-local"
                  value={slot.startTime}
                  onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                  required
                />
                <input
                  type="datetime-local"
                  value={slot.endTime}
                  onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddAvailability}>Add Availability Slot</button>

            <h4>Consultation Fee</h4>
            <input
              type="number"
              value={consultationFee}
              onChange={(e) => setConsultationFee(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit">Register Doctor</button>
      </form>
    </div>
  );
};

export default DoctorForm;
