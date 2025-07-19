import React, { useState, useEffect } from 'react';
import { getAllDoctors, getAllHospitals, getDepartmentsByHospital, addDoctor } from '../utils/dataUtils';

const AssociateDoctorForm = () => {
  const [doctorId, setDoctorId] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [consultationFee, setConsultationFee] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    setHospitals(getAllHospitals());
  }, []);

  useEffect(() => {
    const allDoctors = getAllDoctors();
    console.log('All doctors loaded in AssociateDoctorForm:', allDoctors);
    setDoctors(allDoctors);
    setFilteredDoctors(allDoctors);
  }, []);

  useEffect(() => {
    if (hospitalId) {
      setDepartments(getDepartmentsByHospital(hospitalId));
      const filtered = doctors.filter((doc) =>
        doc.associations && doc.associations.some((assoc) => assoc.hospitalId === hospitalId)
      );
      console.log('Filtered doctors for hospital', hospitalId, ':', filtered);
      setFilteredDoctors(filtered);
    } else {
      setDepartments([]);
      setFilteredDoctors(doctors);
    }
  }, [hospitalId, doctors]);

  const handleAddAvailability = () => {
    setAvailability([...availability, { startTime: '', endTime: '' }]);
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctorId || !hospitalId || !consultationFee) {
      return alert('Please fill all required fields');
    }
    const doctorsList = getAllDoctors();
    const doctor = doctorsList.find((d) => d.id === doctorId);
    if (!doctor) return alert('Doctor not found');

    // Check for conflicting availability slots
    // (This can be enhanced with detailed conflict checks)

    const newAssociation = {
      hospitalId,
      availability,
      consultationFee: parseFloat(consultationFee),
    };

    // Update doctor's associations
    doctor.associations = doctor.associations || [];
    doctor.associations.push(newAssociation);

    // Save updated doctor
    const updatedDoctors = doctorsList.map((d) => (d.id === doctorId ? doctor : d));
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));

    alert('Doctor associated with hospital successfully');
    // Reset form
    setDoctorId('');
    setHospitalId('');
    setAvailability([]);
    setConsultationFee('');
  };

  return (
    <div>
      <h2>Associate Doctor with Hospital</h2>
      <form onSubmit={handleSubmit}>
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
          <option value="">Select Doctor</option>
          {filteredDoctors.map((doc) => (
            <option key={doc.id} value={doc.id}>{doc.name}</option>
          ))}
        </select>

        <select value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} required>
          <option value="">Select Hospital</option>
          {hospitals.map((h) => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>

        {hospitalId && (
          <>
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

        <button type="submit">Associate</button>
      </form>
    </div>
  );
};

export default AssociateDoctorForm;
