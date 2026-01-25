import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COMPANIES, searchCompanies } from '../../data/companies';
import Card from '../common/Card';

const CompanySearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredCompanies = useMemo(() => {
        if (!searchQuery.trim()) return COMPANIES;
        return searchCompanies(searchQuery);
    }, [searchQuery]);

    const handleCompanyClick = (companyId) => {
        navigate(`/company/${companyId}`);
    };

    const getColorClasses = (color) => {
        const colorMap = {
            blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
            indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
            purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
            green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
        };
        return colorMap[color] || colorMap.blue;
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Search Section */}
            <div className="mb-12 animate-fade-in-up">
                <div className="relative max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search companies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm hover:shadow-md"
                    />
                </div>

                {searchQuery && (
                    <p className="text-center mt-4 text-slate-600 animate-fade-in-up">
                        Found {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}
                    </p>
                )}
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company, index) => (
                    <Card
                        key={company.id}
                        className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => handleCompanyClick(company.id)}
                    >
                        <div className="p-6 space-y-4">
                            {/* Company Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">{company.logo}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                            {company.name}
                                        </h3>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>

                            {/* Description */}
                            <p className="text-sm text-slate-600 line-clamp-2">
                                {company.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {company.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200 hover:bg-slate-200 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="pt-2">
                                <div className={`w-full py-2.5 px-4 bg-gradient-to-r ${getColorClasses(company.color)} text-white font-semibold rounded-lg text-center transition-all duration-300 shadow-md group-hover:shadow-lg transform group-hover:scale-105`}>
                                    View Tracker
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredCompanies.length === 0 && (
                <div className="text-center py-16">
                    <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No companies found</h3>
                    <p className="text-slate-500">Try adjusting your search query</p>
                </div>
            )}
        </div>
    );
};

export default CompanySearch;
