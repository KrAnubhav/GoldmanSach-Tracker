/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                // Floating animations
                'float-slow': 'float 20s ease-in-out infinite',
                'float-slow-delayed': 'float 20s ease-in-out 10s infinite',
                'float-medium': 'float 15s ease-in-out infinite',
                'float-fast': 'float 10s ease-in-out infinite',
                'float-gentle': 'floatGentle 6s ease-in-out infinite',

                // Particle animations
                'particle-float': 'particleFloat 20s linear infinite',

                // Pulse animations
                'pulse-slow': 'pulseSlow 4s ease-in-out infinite',

                // Gradient animations
                'gradient-shift': 'gradientShift 15s ease infinite',
                'gradient-text': 'gradientText 8s linear infinite',

                // Entrance animations
                'fade-in-up': 'fadeInUp 1s ease-out',
                'fade-in-up-delayed': 'fadeInUp 1s ease-out 0.3s backwards',
                'slide-in-left': 'slideInLeft 0.8s ease-out',
                'slide-in-right': 'slideInRight 0.8s ease-out',
                'slide-in-up': 'slideInUp 0.8s ease-out',

                // Wave animation
                'wave': 'wave 8s ease-in-out infinite',

                // Spin slow
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: '0.3'
                    },
                    '33%': {
                        transform: 'translate(30px, -30px) scale(1.1)',
                        opacity: '0.4'
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                        opacity: '0.35'
                    },
                },
                floatGentle: {
                    '0%, 100%': {
                        transform: 'translateY(0px)',
                    },
                    '50%': {
                        transform: 'translateY(-20px)',
                    },
                },
                particleFloat: {
                    '0%': {
                        transform: 'translate(0, 0) rotate(0deg)',
                        opacity: '0',
                    },
                    '10%': {
                        opacity: '1',
                    },
                    '90%': {
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'translate(100px, -100vh) rotate(360deg)',
                        opacity: '0',
                    },
                },
                pulseSlow: {
                    '0%, 100%': {
                        opacity: '0.3',
                        transform: 'scale(1)',
                    },
                    '50%': {
                        opacity: '0.6',
                        transform: 'scale(1.05)',
                    },
                },
                gradientShift: {
                    '0%, 100%': {
                        opacity: '0.3',
                    },
                    '50%': {
                        opacity: '0.6',
                    },
                },
                gradientText: {
                    '0%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                    '100%': {
                        backgroundPosition: '0% 50%',
                    },
                },
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                slideInLeft: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(-50px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
                slideInRight: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(50px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
                slideInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                wave: {
                    '0%, 100%': {
                        transform: 'translateX(0)',
                    },
                    '50%': {
                        transform: 'translateX(-2%)',
                    },
                },
            },
        },
    },
    plugins: [],
}
