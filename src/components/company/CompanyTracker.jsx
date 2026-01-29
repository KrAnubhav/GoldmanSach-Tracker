import React, { useState, useEffect, useMemo } from 'react';
import {
  PieChart,
  CheckCircle2,
  Circle,
  BarChart3,
  Upload,
  Search,
  Filter,
  ExternalLink,
  Trophy,
  BrainCircuit,
  Target,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Sparkles,
  Loader2,
  BookOpen,
  Layers,
  FileText,
  List,
  User,
  Calendar,
  Briefcase
} from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { INTERVIEW_EXPERIENCES } from '../../data/goldman-sachs/experiences';
import { PROBLEMS } from '../../data/goldman-sachs/problems';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// --- Firebase Configuration ---
let app, auth, db;
let firebaseEnabled = false;

try {
  if (typeof __firebase_config !== 'undefined' && __firebase_config && __firebase_config !== '{}') {
    const firebaseConfig = JSON.parse(__firebase_config);
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    firebaseEnabled = true;
  }
} catch (error) {
  console.warn('Firebase not configured. Running without cloud sync.');
}

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- Gemini API Configuration ---
const apiKey = ""; // API Key injected at runtime

const callGemini = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate a response right now. Please try again later.";
  }
};

// --- Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type }) => {
  const styles = {
    Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Hard: "bg-rose-100 text-rose-700 border-rose-200",
    default: "bg-slate-100 text-slate-700 border-slate-200",
    // Topic Badges
    "Arrays & Strings": "bg-blue-50 text-blue-700 border-blue-200",
    "Graphs & Trees": "bg-purple-50 text-purple-700 border-purple-200",
    "Dynamic Programming": "bg-orange-50 text-orange-700 border-orange-200",
    "Binary Search & Sorting": "bg-cyan-50 text-cyan-700 border-cyan-200",
    "Design & LLD": "bg-slate-100 text-slate-700 border-slate-300",
    "Linked List": "bg-pink-50 text-pink-700 border-pink-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${styles[type] || styles.default}`}>
      {children}
    </span>
  );
};

const AIModal = ({ isOpen, onClose, title, content, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-slate-500 text-sm">Consulting Gemini...</p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Utilities ---

const parseCSV = (text) => {
  const lines = text.split('\n').filter(l => l.trim());
  const startIdx = lines[0].toLowerCase().includes('title') ? 1 : 0;

  return lines.slice(startIdx).map(line => {
    const values = [];
    let inQuote = false;
    let currentValue = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    return {
      id: values[0],
      title: values[1],
      acceptance: values[2],
      difficulty: values[3],
      frequency: parseFloat(values[4] || 0),
      link: values[5],
      topic: "Uncategorized", // Default for CSV imports
      key: values[0]
    };
  });
};

// --- Data ---

// --- Data is imported from separate files ---
// INTERVIEW_EXPERIENCES from '../../data/goldman-sachs/experiences'
// PROBLEMS from '../../data/goldman-sachs/problems'


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

// --- Icons helpers ---
const CodeIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const CpuIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
const LayoutIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const TerminalSquare = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>;

export default function CompanyTracker() {
  // --- State ---
  const [questions, setQuestions] = useState(PROBLEMS);
  const [completed, setCompleted] = useState({});
  const [readExperiences, setReadExperiences] = useState({});
  const [user, setUser] = useState(null);

  const [activeTab, setActiveTab] = useState('overview'); // 'tracker', 'experiences', or 'overview'

  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterTopic, setFilterTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'frequency', direction: 'desc' });
  const [isDragOver, setIsDragOver] = useState(false);

  // AI Modal State
  const [aiModal, setAiModal] = useState({ isOpen: false, title: '', content: '', isLoading: false });

  // --- Effects ---

  // 1. Auth Initialization
  useEffect(() => {
    if (!firebaseEnabled) {
      // Use localStorage without Firebase
      const savedProgress = localStorage.getItem('gs-tracker-progress');
      if (savedProgress) {
        try {
          setCompleted(JSON.parse(savedProgress));
        } catch (e) {
          console.error('Error loading progress from localStorage');
        }
      }
      return;
    }

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error('Firebase auth error:', error);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // 2. Data Synchronization (Firestore)
  useEffect(() => {
    if (!firebaseEnabled || !user) return;
    const q = collection(db, 'artifacts', appId, 'users', user.uid, 'progress');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newCompleted = {};
      snapshot.forEach((doc) => {
        newCompleted[doc.id] = true;
      });
      setCompleted(newCompleted);
    }, (error) => {
      console.error("Error fetching progress:", error);
    });
    return () => unsubscribe();
  }, [user]);

  // 3. Save to localStorage when not using Firebase
  useEffect(() => {
    if (!firebaseEnabled) {
      localStorage.setItem('gs-tracker-progress', JSON.stringify(completed));
    }
  }, [completed]);

  // 4. Load/Save Read Experiences
  useEffect(() => {
    const savedRead = localStorage.getItem('gs-tracker-read-experiences');
    if (savedRead) {
      try {
        setReadExperiences(JSON.parse(savedRead));
      } catch (e) {
        console.error('Error loading read experiences');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gs-tracker-read-experiences', JSON.stringify(readExperiences));
  }, [readExperiences]);

  // --- Handlers ---

  const handleGetHint = async (question) => {
    setAiModal({
      isOpen: true,
      title: `Hint for "${question.title}"`,
      content: '',
      isLoading: true
    });

    const prompt = `I am trying to solve the LeetCode problem "${question.title}" (Difficulty: ${question.difficulty}). 
    Please provide a conceptual hint and the intuition behind the optimal solution. 
    Explain the algorithm's time and space complexity requirements.
    DO NOT provide the full code solution. Just the approach.`;

    const response = await callGemini(prompt);

    setAiModal(prev => ({
      ...prev,
      content: response,
      isLoading: false
    }));
  };

  const handleGenerateStudyPlan = async () => {
    setAiModal({
      isOpen: true,
      title: "✨ Personalized Study Plan",
      content: '',
      isLoading: true
    });

    const incomplete = questions
      .filter(q => !completed[q.id])
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);

    const statsStr = `Solved ${Object.values(completed).filter(Boolean).length} out of ${questions.length} total questions.`;
    const topMissed = incomplete.map(q => `- ${q.title} (${q.difficulty})`).join('\n');

    const prompt = `I am preparing for a Goldman Sachs technical interview.
    My current progress: ${statsStr}.
    
    Based on high-frequency questions I haven't solved yet, generate a concise 3-day study plan.
    My top 5 unsolved high-priority problems are:
    ${topMissed}
    
    Format the response clearly with Day 1, Day 2, Day 3 headings and specific focus areas for each day.
    Keep it encouraging and tactical.`;

    const response = await callGemini(prompt);

    setAiModal(prev => ({
      ...prev,
      content: response,
      isLoading: false
    }));
  };

  const toggleReadExperience = (id) => {
    setReadExperiences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) processFile(file);
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = parseCSV(e.target.result);
        if (parsed.length > 0) {
          setQuestions(prev => {
            const newQs = [...prev];
            parsed.forEach(p => {
              if (!newQs.find(q => q.id === p.id)) {
                newQs.push(p);
              }
            });
            return newQs;
          });
        }
      } catch (err) {
        alert("Error parsing CSV. Please ensure format matches: ID,Title,Acceptance,Difficulty,Frequency,Link");
      }
    };
    reader.readAsText(file);
  };

  const toggleComplete = async (id) => {
    if (!firebaseEnabled) {
      // Use localStorage
      setCompleted(prev => {
        const newCompleted = { ...prev };
        if (newCompleted[id]) {
          delete newCompleted[id];
        } else {
          newCompleted[id] = true;
        }
        return newCompleted;
      });
      return;
    }

    if (!user) return;
    const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'progress', id);
    try {
      if (completed[id]) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { completed: true, timestamp: Date.now() });
      }
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  // --- Computed Data ---

  const stats = useMemo(() => {
    const total = questions.length;
    const done = Object.values(completed).filter(Boolean).length;

    const byDiff = questions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      if (completed[q.id]) {
        acc[`${q.difficulty}_done`] = (acc[`${q.difficulty}_done`] || 0) + 1;
      }
      return acc;
    }, {});

    return { total, done, byDiff };
  }, [questions, completed]);

  const filteredQuestions = useMemo(() => {
    let result = [...questions];
    if (filterDifficulty !== 'All') result = result.filter(q => q.difficulty === filterDifficulty);
    if (filterStatus !== 'All') result = result.filter(q => filterStatus === 'Done' ? completed[q.id] : !completed[q.id]);
    if (filterTopic !== 'All') result = result.filter(q => q.topic === filterTopic);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => item.title.toLowerCase().includes(q) || item.id.includes(q));
    }
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (typeof aVal === 'string' && aVal.includes('%')) aVal = parseFloat(aVal);
      if (typeof bVal === 'string' && bVal.includes('%')) bVal = parseFloat(bVal);
      if (sortConfig.key === 'difficulty') {
        const rank = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        aVal = rank[a.difficulty] || 0;
        bVal = rank[b.difficulty] || 0;
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [questions, filterDifficulty, filterStatus, filterTopic, searchQuery, sortConfig, completed]);

  // --- UI Components ---

  const ProgressBar = ({ current, max, colorClass }) => {
    const percent = max > 0 ? (current / max) * 100 : 0;
    return (
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-500 ${colorClass}`} style={{ width: `${percent}%` }} />
      </div>
    );
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-50" />;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-blue-600" /> : <ArrowDown className="w-3 h-3 text-blue-600" />;
  };

  const topics = useMemo(() => {
    const ts = new Set(questions.map(q => q.topic || "Uncategorized"));
    return Array.from(ts).sort();
  }, [questions]);

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`
        flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative
        ${activeTab === id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg'}
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
      {activeTab === id && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <AIModal
        isOpen={aiModal.isOpen}
        onClose={() => setAiModal(prev => ({ ...prev, isOpen: false }))}
        title={aiModal.title}
        content={aiModal.content}
        isLoading={aiModal.isLoading}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">GS Prep Tracker</h1>
                <p className="text-sm text-slate-500">Goldman Sachs Interview 6 Months</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors
                  ${isDragOver ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100' : 'bg-white border-slate-200 hover:bg-slate-50'}
                `}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) processFile(file);
                }}
              >
                <Upload className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Import CSV</span>
                <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          <div className="flex gap-2 border-t border-slate-100 pt-1">
            <TabButton id="overview" label="Overview" icon={BrainCircuit} />
            <TabButton id="tracker" label="Problem Tracker" icon={List} />
            <TabButton id="experiences" label="Interview Experiences" icon={FileText} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {activeTab === 'overview' && <OverviewTab experiences={INTERVIEW_EXPERIENCES} />}

        {activeTab === 'tracker' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-5 flex flex-col justify-between relative overflow-hidden group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Progress</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                      {Math.round((stats.done / stats.total) * 100 || 0)}%
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Trophy className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{stats.done} solved</span>
                      <span>{stats.total} total</span>
                    </div>
                    <ProgressBar current={stats.done} max={stats.total} colorClass="bg-blue-600" />
                  </div>

                  <button
                    onClick={handleGenerateStudyPlan}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Study Plan</span>
                  </button>
                </div>
              </Card>

              <Card className="p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Easy</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                      {stats.byDiff.Easy_done || 0}<span className="text-sm text-slate-400 font-normal">/{stats.byDiff.Easy || 0}</span>
                    </h3>
                  </div>
                  <Badge type="Easy">Easy</Badge>
                </div>
                <ProgressBar current={stats.byDiff.Easy_done || 0} max={stats.byDiff.Easy || 1} colorClass="bg-emerald-500" />
              </Card>

              <Card className="p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Medium</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                      {stats.byDiff.Medium_done || 0}<span className="text-sm text-slate-400 font-normal">/{stats.byDiff.Medium || 0}</span>
                    </h3>
                  </div>
                  <Badge type="Medium">Medium</Badge>
                </div>
                <ProgressBar current={stats.byDiff.Medium_done || 0} max={stats.byDiff.Medium || 1} colorClass="bg-amber-500" />
              </Card>

              <Card className="p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Hard</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                      {stats.byDiff.Hard_done || 0}<span className="text-sm text-slate-400 font-normal">/{stats.byDiff.Hard || 0}</span>
                    </h3>
                  </div>
                  <Badge type="Hard">Hard</Badge>
                </div>
                <ProgressBar current={stats.byDiff.Hard_done || 0} max={stats.byDiff.Hard || 1} colorClass="bg-rose-500" />
              </Card>
            </div>

            {/* Controls */}
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title or ID..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-700 cursor-pointer"
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <select
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-700 cursor-pointer"
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                >
                  <option value="All">All Topics</option>
                  {topics.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-700 cursor-pointer"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Done">Completed</option>
                  <option value="Todo">To Do</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-3 w-12 text-center">
                        <CheckCircle2 className="w-4 h-4 text-slate-400 mx-auto" />
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                        onClick={() => handleSort('id')}
                      >
                        <div className="flex items-center gap-1">ID <SortIcon column="id" /></div>
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Title</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Topic</th>
                      <th
                        className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                        onClick={() => handleSort('difficulty')}
                      >
                        <div className="flex items-center gap-1">Difficulty <SortIcon column="difficulty" /></div>
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                        onClick={() => handleSort('acceptance')}
                      >
                        <div className="flex items-center gap-1">Acceptance <SortIcon column="acceptance" /></div>
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                        onClick={() => handleSort('frequency')}
                      >
                        <div className="flex items-center gap-1">Freq <SortIcon column="frequency" /></div>
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuestions.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                          No questions found. Try adjusting your filters or search.
                        </td>
                      </tr>
                    ) : (
                      filteredQuestions.map((q) => {
                        const isDone = !!completed[q.id];
                        return (
                          <tr
                            key={q.id}
                            className={`group transition-colors hover:bg-slate-50 ${isDone ? 'bg-slate-50/50' : ''}`}
                          >
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => toggleComplete(q.id)}
                                className={`p-1 rounded-full transition-colors ${isDone ? 'text-blue-600 bg-blue-50' : 'text-slate-300 hover:text-slate-400'
                                  }`}
                              >
                                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-600">
                              {q.id}
                            </td>
                            <td className="px-6 py-4">
                              <div className={`text-sm font-medium ${isDone ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                                {q.title}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge type={q.topic}>{q.topic}</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <Badge type={q.difficulty}>{q.difficulty}</Badge>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              {q.acceptance}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-12 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${Math.min(q.frequency * 50, 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-slate-500">{q.frequency.toFixed(2)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleGetHint(q)}
                                  className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors px-2 py-1 rounded hover:bg-amber-50"
                                  title="Get AI Hint"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  <span className="hidden sm:inline">Hint</span>
                                </button>
                                <a
                                  href={q.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1 text-sm font-medium transition-colors px-2 py-1 rounded hover:bg-blue-50 ${q.link === '#' ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                                  onClick={e => q.link === '#' && e.preventDefault()}
                                >
                                  Solve <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'experiences' && (
          <div className="space-y-6">
            {INTERVIEW_EXPERIENCES.map((exp) => {
              const isRead = !!readExperiences[exp.id];
              return (
                <Card key={exp.id} className={`overflow-hidden transition-all duration-300 ${isRead ? 'opacity-80' : ''}`}>
                  <div className={`p-6 bg-white transition-colors duration-300 ${isRead ? 'bg-slate-50/50' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 border-b border-slate-100 pb-6">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleReadExperience(exp.id)}
                          className={`mt-1 p-1 rounded-full transition-all duration-200 flex-shrink-0 ${isRead ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-slate-300 hover:text-slate-400 hover:bg-slate-100'}`}
                          title={isRead ? "Mark as unread" : "Mark as read"}
                        >
                          {isRead ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h2 className={`text-xl font-bold transition-colors duration-300 ${isRead ? 'text-slate-600 line-through decoration-slate-400' : 'text-slate-900'}`}>{exp.role} Interview Experience</h2>
                            {isRead && <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">Read</span>}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <User className="w-4 h-4" />
                              {exp.author}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4" />
                              YOE: {exp.yoe}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {exp.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {exp.rounds.map((round, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                              {idx + 1}
                            </div>
                            <h3 className="font-semibold text-slate-900">{round.name}</h3>
                          </div>
                          <div className="pl-10 text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                            {round.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
