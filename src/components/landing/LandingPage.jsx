import React from 'react';
import HeroSection from './HeroSection';
import CompanySearch from './CompanySearch';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
            <HeroSection />
            <CompanySearch />

            {/* Footer */}
            <footer className="mt-24 py-12 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-400">
                        Built to help you ace your dream company interviews
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                        Track problems, review experiences, and prepare strategically
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
