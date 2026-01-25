import React, { useEffect, useRef } from 'react';
import { Search, Sparkles } from 'lucide-react';

const HeroSection = () => {
    const heroRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        // Create floating particles
        const particles = [];
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        particlesRef.current = particles;

        // Parallax effect on mouse move
        const handleMouseMove = (e) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX - innerWidth / 2) / 50;
            const moveY = (clientY - innerHeight / 2) / 50;

            const orbs = heroRef.current.querySelectorAll('.floating-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 animate-gradient-shift"></div>

            {/* Floating orbs with parallax */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="floating-orb absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-float-slow"></div>
                <div className="floating-orb absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-float-slow-delayed"></div>
                <div className="floating-orb absolute top-1/2 left-1/4 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-float-medium"></div>
                <div className="floating-orb absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl animate-float-fast"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particlesRef.current.map((particle, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-particle-float"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: particle.opacity,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: `${15 + i * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
                <div className="text-center space-y-8">
                    {/* Logo/Icon with floating animation */}
                    <div className="flex justify-center animate-float-gentle">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-500/40 blur-2xl rounded-full animate-pulse-slow group-hover:bg-blue-400/60 transition-all duration-500"></div>
                            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                                <Search className="w-12 h-12 text-white" />
                                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin-slow" />
                            </div>
                        </div>
                    </div>

                    {/* Main Heading with staggered animation */}
                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
                            <span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent animate-gradient-text bg-[length:200%_auto]">
                                Interview Tracker
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto font-light animate-fade-in-up-delayed">
                            Your comprehensive guide to cracking top tech companies
                        </p>
                    </div>

                    {/* Feature highlights with staggered entrance */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-slide-in-left hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span>Problem Tracking</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-slide-in-up hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.1s' }}>
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            <span>Interview Experiences</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-slide-in-right hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.2s' }}>
                            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                            <span>Company Insights</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave decoration with subtle animation */}
            <div className="absolute bottom-0 left-0 right-0 animate-wave">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
                </svg>
            </div>
        </div>
    );
};

export default HeroSection;
