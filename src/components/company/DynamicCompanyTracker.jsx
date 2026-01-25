import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';

// Import the existing large CompanyTracker as a fallback
import LegacyCompanyTracker from './CompanyTracker';

/**
 * Dynamic Company Tracker Wrapper
 * Loads company data dynamically and passes to the tracker
 */
const DynamicCompanyTracker = () => {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [problems, setProblems] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timePeriod, setTimePeriod] = useState('all');
    const [error, setError] = useState(null);

    // Load company data
    useEffect(() => {
        const loadData = async () => {
            if (!companyId) {
                setError('No company ID provided');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Load company info
                const companyData = await dataService.getCompanyById(companyId);
                if (!companyData) {
                    setError(`Company "${companyId}" not found`);
                    setLoading(false);
                    return;
                }
                setCompany(companyData);

                // Load problems and experiences in parallel
                const [problemsData, experiencesData] = await Promise.all([
                    dataService.getProblems(companyId, timePeriod),
                    dataService.getExperiences(companyId)
                ]);

                setProblems(problemsData);
                setExperiences(experiencesData);
            } catch (err) {
                console.error('Error loading company data:', err);
                setError(err.message || 'Failed to load company data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [companyId, timePeriod]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600 text-lg">Loading {companyId} data...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Error Loading Company</h2>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Companies
                    </button>
                </div>
            </div>
        );
    }

    // For Goldman Sachs, use the legacy tracker (has all the features)
    if (companyId === 'goldman-sachs') {
        return <LegacyCompanyTracker />;
    }

    // For other companies, render a simple tracker with the loaded data
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-600" />
                            </button>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{company.logo}</span>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
                                    <p className="text-sm text-slate-500">{company.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Time Period Selector */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-slate-700">Time Period:</label>
                            <select
                                value={timePeriod}
                                onChange={(e) => setTimePeriod(e.target.value)}
                                className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {dataService.getTimePeriods().map(period => (
                                    <option key={period.id} value={period.id}>
                                        {period.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Total Problems</h3>
                        <p className="text-3xl font-bold text-slate-900">{problems.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Easy</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {problems.filter(p => p.difficulty === 'EASY').length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Medium</h3>
                        <p className="text-3xl font-bold text-amber-600">
                            {problems.filter(p => p.difficulty === 'MEDIUM').length}
                        </p>
                    </div>
                </div>

                {/* Problems Table */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900">Problems</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Frequency
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Topics
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Link
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {problems.map((problem, index) => (
                                    <tr key={problem.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                            {problem.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${problem.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                                                    problem.difficulty === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {problem.frequency ? problem.frequency.toFixed(1) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            <div className="flex flex-wrap gap-1">
                                                {problem.tags && problem.tags.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {problem.link && problem.link !== '#' && (
                                                <a
                                                    href={problem.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    LeetCode →
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Experiences Section */}
                {experiences.length > 0 && (
                    <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Interview Experiences</h2>
                        <p className="text-slate-600">{experiences.length} experiences available</p>
                    </div>
                )}

                {/* No data message */}
                {problems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No problems found for this time period.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicCompanyTracker;
