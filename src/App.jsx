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
const INTERVIEW_EXPERIENCES = [
  {
    id: 1,
    role: "GS Associate",
    yoe: "2.3 years",
    date: "Oct 21, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Coderpad round - 1",
        content: "Was asked to solve 2 DSA questions -\n1. Basically an easier version of https://algo.monster/liteproblems/1804 with only insert(word) and countWordsStartingWith(prefix)\n2. Find the size of the largest connected component in a forest."
      },
      {
        name: "Coderpad round - 2",
        content: "Was asked to solve 2 DSA questions -\n1. Need to implement a class which will support 2 operations -\n   i. insert(num) - insert a number to the data structure\n   ii. isTopK(num) - tell whether a number is in the top K most frequent numbers in the data structure\n2. First non repeated character in a string. Had a discussion about how to extend the algorithm in case of a large strings which can't be fit into RAM of a single machine."
      },
      {
        name: "Software Engineering Practices - 1",
        content: "Was given a code snippet in Java and was asked to identify the issue in it.\nHow hashmap works? Different types of exception in Java ?\nProject discussion"
      },
      {
        name: "Software Engineering Practices - 2",
        content: "Design a rate limiter. Had a meaningful discussion. Then mentioned about Leaky bucket algorithm. Was finally asked to write a code snippet for the leaky bucket algorithm. [ Was asked about how can we select the leak rate and bucket size for the leaky bucket algo ?]"
      },
      {
        name: "System design round",
        content: "Verbal discussion about LLD of an over simplified stock market. (No coding).\nExtend the LLD to a HLD. Had discussion about transactions and locking in DB.\nResume grilling."
      }
    ]
  },
  {
    id: 2,
    role: "Analyst | Bangalore",
    yoe: "N/A",
    date: "Oct 21, 2025",
    author: "Aasheesh_Mahammad",
    rounds: [
      {
        name: "Online Assessment (OA)",
        content: "Standard coding problems focused on arrays, strings, and time/space complexity."
      },
      {
        name: "CoderPad Screening",
        content: "A live coding session focusing on problem-solving speed, correctness, and clarity.\nQuestions asked:\n• Find the Length of Cycle in an Array 🔄\n• Number of Islands 🏝️ (interviewer preferred BFS over DFS to avoid stack overflow)"
      },
      {
        name: "Superday Round 1 – DSA",
        content: "• Minimum Characters to Remove from the left, right, or both ends to make a string palindrome\n• Binary Search Assignment (similar to Koko Eating Bananas)"
      },
      {
        name: "Superday Round 2 – DSA",
        content: "• Coin Change (Minimum number of coins to make amount)\n• Container With Most Water 💧 (Follow-up: what if container is tilted?)"
      },
      {
        name: "Superday Round 3 – Low-Level Design (LLD)",
        content: "Design a Traffic Light System 🚦 that dynamically adjusts wait times based on real-time traffic data.\nFocus on simplicity, scalability, and trade-offs."
      },
      {
        name: "Superday Round 4 – Behavioural / HR",
        content: "Topics: Past projects, ownership, challenges, deadlines, conflicts, motivation.\n\nScenario: You overhear in a lift that a colleague, who was expecting a salary hike, is actually not going to get one. How would you handle this situation while maintaining professionalism and confidentiality?"
      },
      {
        name: "💡 Tips",
        content: "• Revise BFS/DFS, DP, two-pointer, binary search, and string manipulation.\n• Communicate logic clearly and walk through examples.\n• In LLD, focus on simplicity, scalability, and trade-offs.\n• For HR, prepare structured stories (STAR method) highlighting ownership and teamwork."
      }
    ]
  },
  {
    id: 3,
    role: "SDE",
    yoe: "N/A",
    date: "Oct 23, 2025",
    author: "Anonymous User",
    rounds: [
      {
        name: "Online Assessment (OA)",
        content: "2 questions were asked. Both were Leetcode medium difficulty. Only DSA questions."
      },
      {
        name: "Coderpad Round",
        content: "Problem: Virus propagation in a graph (Uni-directional, no cycles). Given an ID of a person, that person gets the virus. Return all the set of people who will get the virus.\n\nFollow-up: Instead of one ID, now input is a list of IDs. Achieve this with minimal code changes."
      },
      {
        name: "Superday Round 1 – DSA",
        content: "Problem 1: Given a list of building heights. Return the top k tallest buildings.\n\nProblem 2: A graph problem (Leetcode Medium). Involved BFS and Topological sort. Direct implementation question."
      },
      {
        name: "Superday Round 2 – Software Engineering",
        content: "• Many questions from resume.\n• OOPS questions.\n• Different Java HashMap types and time complexity of their operations.\n• 1 puzzle question.\n• Generic SDLC practices questions."
      },
      {
        name: "Superday Round 3 – System Design",
        content: "• Design LRU cache.\n• Resume based questions."
      },
      {
        name: "Hiring Manager Round",
        content: "Very few technical questions. Mostly behavioral and situation-based questions."
      },
      {
        name: "Verdict & Tips",
        content: "Verdict: SELECTED\n\nTips:\n• Be careful with resume keywords. If you mention 'caching', know eviction policies, types, etc. Know at least 80% of concepts around your keywords.\n• Timeline: GS process takes 1-2 months. Patience is key."
      }
    ]
  },
  {
    id: 4,
    role: "Analyst (Software Engineer)",
    yoe: "N/A",
    date: "Oct 12, 2025",
    author: "Heisenberg14",
    rounds: [
      {
        name: "Round 1: Hackerrank OA",
        content: "2 medium level questions to be solved under 70 mins.\n• String compression: aaGGbbbc -> 2a2G3b1c\n• Vector compression: Given a vector, compress characters appearing ≥ threshold."
      },
      {
        name: "Round 2: Coderpad Round",
        content: "• Question 1: Longest strictly increasing subsequence of dwarfs heights, picking only from start or end.\n• Question 2: Sqrt(n) without inbuilt methods, valid to 2 decimal places."
      },
      {
        name: "Round 3: Superday - Data Structure",
        content: "• In-depth project grilling session.\n• Find peak element (LeetCode 162). Optimized from O(NlogN) to O(N) to O(logN).\n• Follow-up: Find an element in the same array where repetition is allowed; return all indices."
      },
      {
        name: "Round 4: Superday - Software Engineering Practices",
        content: "• Question 1: Evaluate Division (LeetCode 399). Explained and coded DFS approach.\n• Question 2: Count Submatrices with All Ones (LeetCode 1504). Optimized from O(N⁴) to O(N³)."
      },
      {
        name: "Round 5: Superday - Software Design & Architecture",
        content: "• Architecture discussion of current project.\n• Design Challenge: Design a Notification Service. Implemented using Observer pattern and Pub-Sub push-based approach."
      },
      {
        name: "Round 6: Managerial Round 1",
        content: "One of the toughest behavioral rounds. Straight to project deep-dives without intro. 45 mins of pressure testing and technical decision justification."
      },
      {
        name: "Round 7: Managerial Round 2",
        content: "10-15 min informal discussion. Felt like a formality call compared to the intensity of the previous round."
      }
    ]
  }
];

const SAMPLE_DATA = [
  // 1. Arrays, Strings & Sliding Window
  { id: "42", title: "Trapping Rain Water", acceptance: "48.9%", difficulty: "Hard", frequency: 0.9988, link: "https://leetcode.com/problems/trapping-rain-water", topic: "Arrays & Strings" },
  { id: "11", title: "Container With Most Water", acceptance: "50.8%", difficulty: "Medium", frequency: 0.1082, link: "https://leetcode.com/problems/container-with-most-water", topic: "Arrays & Strings" },
  { id: "3", title: "Longest Substring Without Repeating Characters", acceptance: "30.4%", difficulty: "Medium", frequency: 0.2078, link: "https://leetcode.com/problems/longest-substring-without-repeating-characters", topic: "Arrays & Strings" },
  { id: "1423", title: "Maximum Points You Can Obtain from Cards", acceptance: "52.2%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards", topic: "Arrays & Strings" },
  { id: "1838", title: "Frequency of the Most Frequent Element", acceptance: "39.5%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/frequency-of-the-most-frequent-element", topic: "Arrays & Strings" },
  { id: "2007", title: "Find Original Array from Doubled Array", acceptance: "40.3%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/find-original-array-from-doubled-array", topic: "Arrays & Strings" },
  { id: "387", title: "First Unique Character in a String", acceptance: "53.4%", difficulty: "Easy", frequency: 0.3210, link: "https://leetcode.com/problems/first-unique-character-in-a-string", topic: "Arrays & Strings" },
  { id: "1312", title: "Minimum Insertion Steps to Make a String Palindrome", acceptance: "67.1%", difficulty: "Hard", frequency: 0.0, link: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome", topic: "Arrays & Strings" },
  { id: "custom-1", title: "Find Second Largest Number", acceptance: "N/A", difficulty: "Easy", frequency: 0.0, link: "#", topic: "Arrays & Strings" },
  { id: "custom-2", title: "Debug: Chars between two words", acceptance: "N/A", difficulty: "Easy", frequency: 0.0, link: "#", topic: "Arrays & Strings" },
  { id: "53", title: "Maximum Subarray", acceptance: "46.5%", difficulty: "Easy", frequency: 0.4869, link: "https://leetcode.com/problems/maximum-subarray", topic: "Arrays & Strings" },
  { id: "1086", title: "High Five", acceptance: "79.7%", difficulty: "Easy", frequency: 1.3586, link: "https://leetcode.com/problems/high-five", topic: "Arrays & Strings" },
  { id: "242", title: "Valid Anagram", acceptance: "56.9%", difficulty: "Easy", frequency: 0.4154, link: "https://leetcode.com/problems/valid-anagram", topic: "Arrays & Strings" },
  { id: "28", title: "Implement strStr()", acceptance: "34.5%", difficulty: "Easy", frequency: 0.3421, link: "https://leetcode.com/problems/implement-strstr", topic: "Arrays & Strings" },
  { id: "20", title: "Valid Parentheses", acceptance: "38.8%", difficulty: "Easy", frequency: 0.3396, link: "https://leetcode.com/problems/valid-parentheses", topic: "Arrays & Strings" },
  { id: "5", title: "Longest Palindromic Substring", acceptance: "29.5%", difficulty: "Medium", frequency: 0.1388, link: "https://leetcode.com/problems/longest-palindromic-substring", topic: "Arrays & Strings" },
  { id: "443", title: "String Compression", acceptance: "44.6%", difficulty: "Medium", frequency: 0.1171, link: "https://leetcode.com/problems/string-compression", topic: "Arrays & Strings" },
  { id: "49", title: "Group Anagrams", acceptance: "56.9%", difficulty: "Medium", frequency: 0.0436, link: "https://leetcode.com/problems/group-anagrams", topic: "Arrays & Strings" },
  { id: "125", title: "Valid Palindrome", acceptance: "36.6%", difficulty: "Easy", frequency: 0.0387, link: "https://leetcode.com/problems/valid-palindrome", topic: "Arrays & Strings" },
  { id: "76", title: "Minimum Window Substring", acceptance: "34.6%", difficulty: "Hard", frequency: 0.0062, link: "https://leetcode.com/problems/minimum-window-substring", topic: "Arrays & Strings" },

  // 2. Graphs, Trees & Union-Find
  { id: "200", title: "Number of Islands", acceptance: "46.8%", difficulty: "Medium", frequency: 0.0247, link: "https://leetcode.com/problems/number-of-islands", topic: "Graphs & Trees" },
  { id: "323", title: "Number of Connected Components in an Undirected Graph", acceptance: "59.2%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph", topic: "Graphs & Trees" },
  { id: "custom-3", title: "Virus Propagation (Graph Reachability)", acceptance: "N/A", difficulty: "Medium", frequency: 0.0, link: "#", topic: "Graphs & Trees" },
  { id: "399", title: "Evaluate Division", acceptance: "58.6%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/evaluate-division", topic: "Graphs & Trees" },
  { id: "787", title: "Cheapest Flights Within K Stops", acceptance: "37.2%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/cheapest-flights-within-k-stops", topic: "Graphs & Trees" },
  { id: "1197", title: "Minimum Knight Moves", acceptance: "36.8%", difficulty: "Medium", frequency: 0.0396, link: "https://leetcode.com/problems/minimum-knight-moves", topic: "Graphs & Trees" },
  { id: "207", title: "Course Schedule", acceptance: "43.1%", difficulty: "Medium", frequency: 0.1415, link: "https://leetcode.com/problems/course-schedule", topic: "Graphs & Trees" },
  { id: "98", title: "Validate Binary Search Tree", acceptance: "27.8%", difficulty: "Medium", frequency: 0.0715, link: "https://leetcode.com/problems/validate-binary-search-tree", topic: "Graphs & Trees" },
  { id: "230", title: "Kth Smallest Element in a BST", acceptance: "60.2%", difficulty: "Medium", frequency: 0.0886, link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst", topic: "Graphs & Trees" },
  { id: "235", title: "Lowest Common Ancestor of a BST", acceptance: "50.4%", difficulty: "Easy", frequency: 0.0094, link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree", topic: "Graphs & Trees" },
  { id: "1041", title: "Robot Bounded In Circle", acceptance: "49.6%", difficulty: "Medium", frequency: 0.6950, link: "https://leetcode.com/problems/robot-bounded-in-circle", topic: "Graphs & Trees" },
  { id: "695", title: "Max Area of Island", acceptance: "63.2%", difficulty: "Medium", frequency: 0.2801, link: "https://leetcode.com/problems/max-area-of-island", topic: "Graphs & Trees" },
  { id: "1169", title: "Invalid Transactions", acceptance: "31.3%", difficulty: "Medium", frequency: 0.3857, link: "https://leetcode.com/problems/invalid-transactions", topic: "Graphs & Trees" },
  { id: "128", title: "Longest Consecutive Sequence", acceptance: "48.7%", difficulty: "Medium", frequency: 0.0163, link: "https://leetcode.com/problems/longest-consecutive-sequence", topic: "Graphs & Trees" },

  // 3. Dynamic Programming
  { id: "123", title: "Best Time to Buy and Sell Stock III", acceptance: "42.5%", difficulty: "Hard", frequency: 0.0, link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii", topic: "Dynamic Programming" },
  { id: "188", title: "Best Time to Buy and Sell Stock IV", acceptance: "34.1%", difficulty: "Hard", frequency: 0.0, link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv", topic: "Dynamic Programming" },
  { id: "416", title: "Partition Equal Subset Sum", acceptance: "46.3%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/partition-equal-subset-sum", topic: "Dynamic Programming" },
  { id: "322", title: "Coin Change", acceptance: "35.5%", difficulty: "Medium", frequency: 0.0270, link: "https://leetcode.com/problems/coin-change", topic: "Dynamic Programming" },
  { id: "64", title: "Minimum Path Sum", acceptance: "54.7%", difficulty: "Medium", frequency: 0.3705, link: "https://leetcode.com/problems/minimum-path-sum", topic: "Dynamic Programming" },
  { id: "custom-4", title: "Max Path Sum (Diagonal/Down only)", acceptance: "N/A", difficulty: "Medium", frequency: 0.0, link: "#", topic: "Dynamic Programming" },
  { id: "1504", title: "Count Submatrices with All Ones", acceptance: "57.7%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/count-submatrices-with-all-ones", topic: "Dynamic Programming" },
  { id: "300", title: "Longest Increasing Subsequence", acceptance: "43.0%", difficulty: "Medium", frequency: 0.0469, link: "https://leetcode.com/problems/longest-increasing-subsequence", topic: "Dynamic Programming" },
  { id: "70", title: "Climbing Stairs", acceptance: "47.8%", difficulty: "Easy", frequency: 0.3548, link: "https://leetcode.com/problems/climbing-stairs", topic: "Dynamic Programming" },
  { id: "62", title: "Unique Paths", acceptance: "53.6%", difficulty: "Medium", frequency: 0.2585, link: "https://leetcode.com/problems/unique-paths", topic: "Dynamic Programming" },
  { id: "139", title: "Word Break", acceptance: "40.1%", difficulty: "Medium", frequency: 0.0768, link: "https://leetcode.com/problems/word-break", topic: "Dynamic Programming" },
  { id: "1235", title: "Maximum Profit in Job Scheduling", acceptance: "45.0%", difficulty: "Hard", frequency: 0.0353, link: "https://leetcode.com/problems/maximum-profit-in-job-scheduling", topic: "Dynamic Programming" },
  { id: "121", title: "Best Time to Buy and Sell Stock", acceptance: "50.5%", difficulty: "Easy", frequency: 0.1702, link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock", topic: "Dynamic Programming" },

  // 4. Binary Search & Sorting
  { id: "33", title: "Search in Rotated Sorted Array", acceptance: "34.6%", difficulty: "Medium", frequency: 0.2519, link: "https://leetcode.com/problems/search-in-rotated-sorted-array", topic: "Binary Search & Sorting" },
  { id: "162", title: "Find Peak Element", acceptance: "45.9%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/find-peak-element", topic: "Binary Search & Sorting" },
  { id: "69", title: "Sqrt(x)", acceptance: "36.5%", difficulty: "Easy", frequency: 0.0, link: "https://leetcode.com/problems/sqrtx", topic: "Binary Search & Sorting" },
  { id: "4", title: "Median of Two Sorted Arrays", acceptance: "30.0%", difficulty: "Hard", frequency: 0.0244, link: "https://leetcode.com/problems/median-of-two-sorted-arrays", topic: "Binary Search & Sorting" },
  { id: "1552", title: "Magnetic Force Between Two Balls", acceptance: "54.5%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/magnetic-force-between-two-balls", topic: "Binary Search & Sorting" },
  { id: "1985", title: "Find the Kth Largest Integer in the Array", acceptance: "45.6%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array", topic: "Binary Search & Sorting" },
  { id: "23", title: "Merge k Sorted Lists", acceptance: "40.2%", difficulty: "Hard", frequency: 0.0205, link: "https://leetcode.com/problems/merge-k-sorted-lists", topic: "Binary Search & Sorting" },
  { id: "34", title: "Find First and Last Position of Element in Sorted Array", acceptance: "40.3%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array", topic: "Binary Search & Sorting" },
  { id: "custom-5", title: "Find Top K Tallest Buildings", acceptance: "N/A", difficulty: "Medium", frequency: 0.0, link: "#", topic: "Binary Search & Sorting" },
  { id: "724", title: "Find Pivot Index", acceptance: "44.6%", difficulty: "Easy", frequency: 0.2870, link: "https://leetcode.com/problems/find-pivot-index", topic: "Binary Search & Sorting" },
  { id: "215", title: "Kth Largest Element in an Array", acceptance: "55.4%", difficulty: "Medium", frequency: 0.1670, link: "https://leetcode.com/problems/kth-largest-element-in-an-array", topic: "Binary Search & Sorting" },
  { id: "88", title: "Merge Sorted Array", acceptance: "39.4%", difficulty: "Easy", frequency: 0.0384, link: "https://leetcode.com/problems/merge-sorted-array", topic: "Binary Search & Sorting" },
  { id: "1356", title: "Sort Integers by The Number of 1 Bits", acceptance: "71.4%", difficulty: "Easy", frequency: 0.0765, link: "https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits", topic: "Binary Search & Sorting" },

  // 5. Design & LLD
  { id: "custom-6", title: "Vector Implementation", acceptance: "N/A", difficulty: "Medium", frequency: 0.0, link: "#", topic: "Design & LLD" },
  { id: "432", title: "All O(1) Data Structure", acceptance: "36.2%", difficulty: "Hard", frequency: 0.0, link: "https://leetcode.com/problems/all-oone-data-structure", topic: "Design & LLD" },
  { id: "custom-7", title: "Music Player Shuffler", acceptance: "N/A", difficulty: "Medium", frequency: 0.0, link: "#", topic: "Design & LLD" },
  { id: "208", title: "Implement Trie (Prefix Tree)", acceptance: "56.4%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/implement-trie-prefix-tree", topic: "Design & LLD" },
  { id: "custom-8", title: "Insert & IsTopK (Data Stream)", acceptance: "N/A", difficulty: "Medium", frequency: 0.0, link: "#", topic: "Design & LLD" },
  { id: "155", title: "Min Stack", acceptance: "44.5%", difficulty: "Easy", frequency: 0.4748, link: "https://leetcode.com/problems/min-stack", topic: "Design & LLD" },
  { id: "706", title: "Design HashMap", acceptance: "61.3%", difficulty: "Easy", frequency: 0.2319, link: "https://leetcode.com/problems/design-hashmap", topic: "Design & LLD" },
  { id: "146", title: "LRU Cache", acceptance: "33.2%", difficulty: "Medium", frequency: 0.1664, link: "https://leetcode.com/problems/lru-cache", topic: "Design & LLD" },
  { id: "347", title: "Top K Frequent Elements", acceptance: "60.7%", difficulty: "Medium", frequency: 0.1741, link: "https://leetcode.com/problems/top-k-frequent-elements", topic: "Design & LLD" },

  // 6. Linked List & Others
  { id: "142", title: "Linked List Cycle II", acceptance: "44.9%", difficulty: "Medium", frequency: 0.0, link: "https://leetcode.com/problems/linked-list-cycle-ii", topic: "Linked List" },
  { id: "25", title: "Reverse Nodes in k-Group", acceptance: "51.1%", difficulty: "Hard", frequency: 0.0, link: "https://leetcode.com/problems/reverse-nodes-in-k-group", topic: "Linked List" },
  { id: "custom-9", title: "Max IP Count (Log Parsing)", acceptance: "N/A", difficulty: "Medium", frequency: 0.0, link: "#", topic: "Linked List" },
  { id: "496", title: "Next Greater Element I", acceptance: "69.0%", difficulty: "Easy", frequency: 0.0, link: "https://leetcode.com/problems/next-greater-element-i", topic: "Linked List" },
  { id: "141", title: "Linked List Cycle", acceptance: "41.1%", difficulty: "Easy", frequency: 0.3951, link: "https://leetcode.com/problems/linked-list-cycle", topic: "Linked List" },
  { id: "2", title: "Add Two Numbers", acceptance: "33.9%", difficulty: "Medium", frequency: 0.1362, link: "https://leetcode.com/problems/add-two-numbers", topic: "Linked List" },
  { id: "206", title: "Reverse Linked List", acceptance: "62.5%", difficulty: "Easy", frequency: 0.0052, link: "https://leetcode.com/problems/reverse-linked-list", topic: "Linked List" },
  { id: "237", title: "Delete Node in a Linked List", acceptance: "63.8%", difficulty: "Easy", frequency: 0.0051, link: "https://leetcode.com/problems/delete-node-in-a-linked-list", topic: "Linked List" },
  // Remaining items
  { id: "17", title: "Letter Combinations of a Phone Number", acceptance: "46.8%", difficulty: "Medium", frequency: 0.4401, link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number", topic: "Arrays & Strings" },
  { id: "1", title: "Two Sum", acceptance: "45.6%", difficulty: "Easy", frequency: 0.1582, link: "https://leetcode.com/problems/two-sum", topic: "Arrays & Strings" },
  { id: "253", title: "Meeting Rooms II", acceptance: "45.7%", difficulty: "Medium", frequency: 0.0898, link: "https://leetcode.com/problems/meeting-rooms-ii", topic: "Binary Search & Sorting" },
];

export default function App() {
  // --- State ---
  const [questions, setQuestions] = useState(SAMPLE_DATA);
  const [completed, setCompleted] = useState({});
  const [user, setUser] = useState(null);

  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' or 'experiences'

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

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-t border-slate-100 pt-1">
            <TabButton id="tracker" label="Problem Tracker" icon={List} />
            <TabButton id="experiences" label="Interview Experiences" icon={FileText} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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
            {INTERVIEW_EXPERIENCES.map((exp) => (
              <Card key={exp.id} className="overflow-hidden">
                <div className="p-6 bg-white">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 border-b border-slate-100 pb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{exp.role} Interview Experience</h2>
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
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
