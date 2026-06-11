import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerApp from './customer/CustomerApp';
import PartnerApp from './partner/PartnerApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Partner Dashboard */}
        <Route path="/partner/*" element={<PartnerApp />} />

        {/* Customer App (handles onboarding internally) */}
        <Route path="/*" element={<CustomerApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;