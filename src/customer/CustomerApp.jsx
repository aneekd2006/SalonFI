import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import CustomerAppShell from './components/AppShell';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import SalonDetailScreen from './screens/SalonDetailScreen';
import BookingFlowScreen from './screens/BookingFlowScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import useAuthStore from '../stores/authStore';
import useBookingStore from '../stores/bookingStore';

export default function CustomerApp() {
  const { hasSeenOnboarding, isAuthenticated } = useAuthStore();
  const { initialize } = useBookingStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    useAuthStore.getState().initialize();
    initialize();
  }, []);

  // On first launch, redirect to onboarding
  useEffect(() => {
    const state = useAuthStore.getState();
    if (!state.hasSeenOnboarding && location.pathname !== '/onboarding') {
      navigate('/onboarding', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingScreen onComplete={() => navigate('/', { replace: true })} />} />
      <Route element={<CustomerAppShell />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/explore" element={<ExploreScreen />} />
        <Route path="/bookings" element={<MyBookingsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/register-salon" element={<RegistrationScreen />} />
      </Route>
      <Route path="/salon/:salonId" element={<SalonDetailScreen />} />
      <Route path="/book/:salonId" element={<BookingFlowScreen />} />
    </Routes>
  );
}