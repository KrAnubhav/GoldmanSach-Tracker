import React from 'react';

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

export default Badge;
