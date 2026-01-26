import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.png';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dokkho/login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        // Full screen container with Primary Color background
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#4169E1] transition-all duration-500">

            {/* Logo Wrapper: Responsive sizing */}
            <div className="flex flex-col items-center animate-fade-in-up">
                <div className="bg-[#f3f3f3] p-1 rounded-3xl shadow-2xl mb-6 transform transition-transform hover:scale-105">
                    <img
                        src={logo}
                        alt="Dokkho Logo"
                        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                    />
                </div>

                {/* Slogan with Supporting Color Accent */}
                <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center px-4 tracking-wide">
                    স্থানীয় সেবা, <span className="text-[#FF9F4B]">আস্থার হাত</span>
                </h1>

                {/* Loading Indicator using Supporting Blue/Teal */}
                <div className="mt-8 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#008B9C] animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-[#008B9C] animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#008B9C] animate-bounce [animation-delay:-.5s]"></div>
                </div>
            </div>

            {/* Footer Branding using Neutral Color */}
            <div className="absolute bottom-10 text-white/70 text-sm font-medium">
                © 2026 Dokkho. All Rights Reserved.
            </div>
        </div>
    );
};

export default Home;