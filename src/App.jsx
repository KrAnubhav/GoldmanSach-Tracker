import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import DynamicCompanyTracker from './components/company/DynamicCompanyTracker';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/company/:companyId" element={<DynamicCompanyTracker />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
