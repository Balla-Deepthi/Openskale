import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import HospitalForm from "./components/HospitalForm";
import DoctorForm from "./components/DoctorForm";
import AssociateDoctorForm from "./components/AssociateDoctorForm";
import AppointmentForm from "./components/AppointmentForm";
import PatientForm from "./components/PatientForm";
import HospitalDashboard from "./components/HospitalDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientHistory from "./components/PatientHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="register-hospital" element={<HospitalForm />} />
          <Route path="register-doctor" element={<DoctorForm />} />
          <Route path="associate-doctor" element={<AssociateDoctorForm />} />
          <Route path="book-appointment" element={<AppointmentForm />} />
          <Route path="register-patient" element={<PatientForm />} />
          <Route path="hospital-dashboard" element={<HospitalDashboard />} />
          <Route path="doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="patient-history" element={<PatientHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
