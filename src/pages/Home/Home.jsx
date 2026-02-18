import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaTools } from 'react-icons/fa';
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-white transition-all duration-500 relative">

            {/* Center Content */}
            <div className="flex flex-col items-center text-center">

                {/* Icon Wrapper */}
                <div className="bg-[#E11D48] p-4 rounded-2xl mb-6 shadow-md">
                    <FaTools className="text-white w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                </div>

                {/* Bangla Text */}
                <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium max-w-[220px] leading-relaxed">
                    আপনার স্থানীয় সেবাদাতা আপনার হাতের মুঠোয়
                </p>

                {/* Loading Dots (2 sec until redirect) */}
                <div className="mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse [animation-delay:.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse [animation-delay:.4s]"></span>
                </div>
            </div>

        </div>
    );
};

export default Home;