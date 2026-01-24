import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import CompanyTracker from './components/company/CompanyTracker';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/company/:companyId" element={<CompanyTracker />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
