import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PartnerShell from './components/PartnerShell';
import PartnerLoginScreen from './screens/PartnerLoginScreen';
import PartnerRegistrationScreen from './screens/PartnerRegistrationScreen';
import PartnerDashboardScreen from './screens/PartnerDashboardScreen';
import QueueManagementScreen from './screens/QueueManagementScreen';
import BookingsListScreen from './screens/BookingsListScreen';
import ServicesScreen from './screens/ServicesScreen';
import SettingsScreen from './screens/SettingsScreen';

export default function PartnerApp() {
  return (
    <Routes>
      <Route path="/login" element={<PartnerLoginScreen />} />
      <Route path="/register" element={<PartnerRegistrationScreen />} />
      <Route element={<PartnerShell />}>
        <Route path="/dashboard" element={<PartnerDashboardScreen />} />
        <Route path="/queue" element={<QueueManagementScreen />} />
        <Route path="/bookings" element={<BookingsListScreen />} />
        <Route path="/services" element={<ServicesScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>
    </Routes>
  );
}