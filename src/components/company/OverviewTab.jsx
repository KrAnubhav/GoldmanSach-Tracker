import React, { useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { BookOpen, Layers, Target, BrainCircuit } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

// Icon helpers
const CodeIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const CpuIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
const LayoutIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const TerminalSquare = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>;

const OverviewTab = ({ experiences }) => {
    // Analyze data from experiences
    const insights = useMemo(() => {
        const totalExp = experiences.length;
        const allRounds = experiences.flatMap(e => e.rounds);
        const avgRounds = Math.round(allRounds.length / totalExp) || 5;

        // Keyword frequency analysis
        const keywords = {
            "HashMap Internals": 0,
            "Trapping Rain Water": 0,
            "System Design": 0,
            "Concurrent/Multi-threading": 0,
            "DP": 0,
            "Graphs": 0
        };

        const textContent = JSON.stringify(experiences).toLowerCase();

        // Rough counting for visualization
        keywords["HashMap Internals"] = (textContent.match(/hashmap|internal|collision/g) || []).length;
        keywords["Trapping Rain Water"] = (textContent.match(/rain|water|trapping/g) || []).length;
        keywords["System Design"] = (textContent.match(/design|architecture|lld|hld/g) || []).length;
        keywords["Concurrent/Multi-threading"] = (textContent.match(/thread|concurrent|lock/g) || []).length;
        keywords["DP"] = (textContent.match(/dp|dynamic programming/g) || []).length;
        keywords["Graphs"] = (textContent.match(/graph|bfs|dfs/g) || []).length;

        return { totalExp, avgRounds, keywords };
    }, [experiences]);

    const radarData = {
        labels: Object.keys(insights.keywords),
        datasets: [{
            label: 'Topic Frequency',
            data: Object.values(insights.keywords),
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue-500 low opacity
            borderColor: 'rgba(59, 130, 246, 1)',     // Blue-500
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#2563eb',
            pointHoverBackgroundColor: '#2563eb',
            pointHoverBorderColor: '#ffffff'
        }]
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: '#e2e8f0' },
                grid: { color: '#e2e8f0' },
                pointLabels: {
                    font: { size: 11, family: 'ui-sans-serif, system-ui, sans-serif', weight: '600' },
                    color: '#64748b'
                },
                ticks: { display: false }
            }
        },
        plugins: {
            legend: { display: false }
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 flex items-center gap-4 border-l-4 border-l-blue-500">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Experiences Analyzed</p>
                        <h3 className="text-2xl font-bold text-slate-900">{insights.totalExp}</h3>
                        <p className="text-xs text-slate-400">Verified Candidates</p>
                    </div>
                </Card>

                <Card className="p-6 flex items-center gap-4 border-l-4 border-l-indigo-500">
                    <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Avg. Rounds</p>
                        <h3 className="text-2xl font-bold text-slate-900">~{insights.avgRounds} Rounds</h3>
                        <p className="text-xs text-slate-400">OA to Hiring Manager</p>
                    </div>
                </Card>

                <Card className="p-6 flex items-center gap-4 border-l-4 border-l-amber-500">
                    <div className="p-3 bg-amber-50 rounded-full text-amber-600">
                        <Target className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Top Focus</p>
                        <h3 className="text-2xl font-bold text-slate-900">DSA & Internals</h3>
                        <p className="text-xs text-slate-400">HashMap, Concurrency, DP</p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Process Timeline */}
                <Card className="lg:col-span-1 p-6 h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <BrainCircuit className="w-5 h-5 text-slate-700" />
                        <h3 className="text-lg font-bold text-slate-900">The "Gauntlet" Process</h3>
                    </div>

                    <div className="relative pl-4 border-l-2 border-slate-100 space-y-8">
                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500"></div>
                            <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                                <h4 className="font-bold text-slate-800 text-sm">1. Online Assessment</h4>
                                <span className="text-xs text-slate-500 font-medium block mt-1">HackerRank | 90-120 min</span>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                    Typically 2 coding questions. One medium, one hard.
                                    <span className="block mt-1 font-medium text-blue-700">Common: "Rain Water", "String Compression"</span>
                                </p>
                            </div>
                        </div>

                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-500"></div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <h4 className="font-bold text-slate-800 text-sm">2. CoderPad Screen</h4>
                                <span className="text-xs text-slate-500 font-medium block mt-1">Live Coding | 60 min</span>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                    Live video. Code must run and pass test cases. Communication is key.
                                </p>
                            </div>
                        </div>

                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-white border-2 border-amber-500"></div>
                            <div className="bg-amber-50/30 p-3 rounded-lg border border-amber-100">
                                <h4 className="font-bold text-slate-800 text-sm">3. The Superday Loop</h4>
                                <span className="text-xs text-slate-500 font-medium block mt-1">3-4 Back-to-Back Rounds</span>
                                <ul className="mt-2 space-y-2">
                                    <li className="text-xs text-slate-700 flex items-start gap-2">
                                        <CodeIcon className="w-3 h-3 mt-0.5 text-amber-600" />
                                        <span><strong>DSA:</strong> DP, Trees, and Matrix problems.</span>
                                    </li>
                                    <li className="text-xs text-slate-700 flex items-start gap-2">
                                        <CpuIcon className="w-3 h-3 mt-0.5 text-amber-600" />
                                        <span><strong>Software Practices:</strong> Java Internals, Garbage Collection, Concurrency.</span>
                                    </li>
                                    <li className="text-xs text-slate-700 flex items-start gap-2">
                                        <LayoutIcon className="w-3 h-3 mt-0.5 text-amber-600" />
                                        <span><strong>Design:</strong> LLD (Parking Lot, Game) or System Design (Twitter, Cache).</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-white border-2 border-green-500"></div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <h4 className="font-bold text-slate-800 text-sm">4. Hiring Manager</h4>
                                <span className="text-xs text-slate-500 font-medium block mt-1">Behavioral | 30-45 min</span>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                    Culture fit. "Why Goldman Sachs?". Resume deep dives.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Right Column: Analytics & Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Chart Section */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Topic Frequency Analysis</h3>
                            <Badge type="default">Data from {insights.totalExp} Reports</Badge>
                        </div>
                        <div className="h-[300px] w-full">
                            <Radar data={radarData} options={radarOptions} />
                        </div>
                    </Card>

                    {/* Questions Vault - Extracted from Actual Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-5 border-t-4 border-t-blue-500">
                            <div className="flex items-center gap-2 mb-4">
                                <TerminalSquare className="w-5 h-5 text-blue-600" />
                                <h4 className="font-bold text-slate-800">Most Reported Coding Qs</h4>
                            </div>
                            <ul className="space-y-3">
                                {["Trapping Rain Water", "Median of Two Sorted Arrays", "String Compression / RLE", "First Unique Character", "Cycle inside Array"].map((q, i) => (
                                    <li key={i} className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 flex gap-2 items-center">
                                        <span className="font-mono text-blue-600 font-bold">{i + 1}.</span>
                                        {q}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className="p-5 border-t-4 border-t-amber-500">
                            <div className="flex items-center gap-2 mb-4">
                                <CpuIcon className="w-5 h-5 text-amber-600" />
                                <h4 className="font-bold text-slate-800">Theory & Design</h4>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "How HashMap works internally (collisions)?",
                                    "Design a Rate Limiter / Twitter",
                                    "Java Concurrency & Thread Safety",
                                    "Handle 10TB file in 4GB RAM",
                                    "SQL vs NoSQL trade-offs"
                                ].map((q, i) => (
                                    <li key={i} className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 flex gap-2 items-center">
                                        <span className="font-mono text-amber-600 font-bold">{i + 1}.</span>
                                        {q}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
