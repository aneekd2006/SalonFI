import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerApp from './customer/CustomerApp';
import PartnerApp from './partner/PartnerApp';
import useUiStore from './stores/uiStore';

function App() {
  const initializeUi = useUiStore((state) => state.initialize);

  useEffect(() => {
    initializeUi();
  }, [initializeUi]);

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