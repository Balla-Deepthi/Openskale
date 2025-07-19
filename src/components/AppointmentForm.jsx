import React, { useState, useEffect } from 'react';
import {
  getAllHospitals,
  getAllDoctors,
  getAppointmentsByDoctor,
  addAppointment,
  getDepartmentsByHospital,
} from '../utils/dataUtils';

const AppointmentForm = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [patientIdNumber, setPatientIdNumber] = useState('');
  const [consultationFee, setConsultationFee] = useState(0);

  useEffect(() => {
    setHospitals(getAllHospitals());
    setDoctors(getAllDoctors());
  }, []);

  useEffect(() => {
    if (selectedHospital && selectedSpecialization) {
      const filtered = doctors.filter((doc) =>
        doc.associations &&
        doc.associations.some(
          (assoc) =>
            assoc.hospitalId === selectedHospital &&
            doc.specializations.includes(selectedSpecialization)
        )
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
    setSelectedDoctor('');
    setAvailableSlots([]);
    setSelectedSlot('');
  }, [selectedHospital, selectedSpecialization, doctors]);

  useEffect(() => {
    if (selectedDoctor && selectedHospital) {
      const doctor = doctors.find((d) => d.id === selectedDoctor);
      if (!doctor) return;
      const assoc = doctor.associations.find((a) => a.hospitalId === selectedHospital);
      if (!assoc) return;
      // Filter availability slots that are not booked
      const bookedAppointments = getAppointmentsByDoctor(selectedDoctor);
      const bookedSlots = bookedAppointments
        .filter((appt) => appt.hospitalId === selectedHospital)
        .map((appt) => appt.startTime);
      const available = assoc.availability.filter(
        (slot) => !bookedSlots.includes(slot.startTime)
      );
      setAvailableSlots(available);
      setConsultationFee(assoc.consultationFee);
    } else {
      setAvailableSlots([]);
      setConsultationFee(0);
    }
    setSelectedSlot('');
  }, [selectedDoctor, selectedHospital, doctors]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!patientName || !patientGender || !patientDob || !patientIdNumber) {
      return alert('Please fill all patient details');
    }
    if (!selectedDoctor || !selectedSlot) {
      return alert('Please select doctor and time slot');
    }
    // Save patient
    const patient = {
      name: patientName,
      gender: patientGender,
      dob: patientDob,
      uniqueId: patientIdNumber,
    };
    // For simplicity, patient ID is generated in addPatient
    // Add patient and get patient ID
    // Here, we assume addPatient returns the patient with id
    // But since we don't have that, we simulate with localStorageUtils
    // For now, we skip patient storage and use patientIdNumber as patientId

    const appointment = {
      doctorId: selectedDoctor,
      hospitalId: selectedHospital,
      patientId: patientIdNumber,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      consultationFee,
    };
    addAppointment(appointment);
    alert('Appointment booked successfully');
    // Reset form
    setPatientName('');
    setPatientGender('');
    setPatientDob('');
    setPatientIdNumber('');
    setSelectedHospital('');
    setSelectedSpecialization('');
    setSelectedDoctor('');
    setAvailableSlots([]);
    setSelectedSlot('');
  };

  const departments = selectedHospital ? getDepartmentsByHospital(selectedHospital) : [];

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleBooking}>
        <h3>Patient Details</h3>
        <input
          type="text"
          placeholder="Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
        <select value={patientGender} onChange={(e) => setPatientGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          value={patientDob}
          onChange={(e) => setPatientDob(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Unique ID (Aadhar, Passport)"
          value={patientIdNumber}
          onChange={(e) => setPatientIdNumber(e.target.value)}
          required
        />

        <h3>Appointment Details</h3>
        <select value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)} required>
          <option value="">Select Hospital</option>
          {hospitals.map((h) => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>

        {selectedHospital && (
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            required
          >
            <option value="">Select Specialization</option>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.name}>{dep.name}</option>
            ))}
          </select>
        )}

        {filteredDoctors.length > 0 && (
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
            <option value="">Select Doctor</option>
            {filteredDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
        )}

        {availableSlots.length > 0 && (
          <select value={selectedSlot} onChange={(e) => {
            const slot = availableSlots.find(s => s.startTime === e.target.value);
            setSelectedSlot(slot);
          }} required>
            <option value="">Select Time Slot</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot.startTime}>
                {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
              </option>
            ))}
          </select>
        )}

        {consultationFee > 0 && <p>Consultation Fee: ₹{consultationFee}</p>}

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
