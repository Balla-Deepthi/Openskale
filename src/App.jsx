import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import Login from './components/Login';
import Registration from './components/Registration';
import HospitalDashboard from './components/HospitalDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientHistory from './components/PatientHistory';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import HospitalForm from './components/HospitalForm';
import DoctorForm from './components/DoctorForm';
import AssociateDoctorForm from './components/AssociateDoctorForm';
import AppointmentForm from './components/AppointmentForm';
import PatientForm from './components/PatientForm';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="register-hospital"
              element={
                <ProtectedRoute allowedRoles={['hospitalAdmin']}>
                  <HospitalForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="register-doctor"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="associate-doctor"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <AssociateDoctorForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="book-appointment"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <AppointmentForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="register-patient"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="hospital-dashboard"
              element={
                <ProtectedRoute allowedRoles={['hospitalAdmin']}>
                  <HospitalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="doctor-dashboard"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="patient-history"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientHistory />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
