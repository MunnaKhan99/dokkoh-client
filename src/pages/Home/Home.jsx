import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaHandshake } from 'react-icons/fa6'; // Font Awesome 6 Handshake Icon

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dokkho/login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#2563EB]">
            <div className="flex flex-col items-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
                    <FaHandshake size={50} className="text-[#0FA958]" />
                </div>

                <h1 className="text-3xl font-bold text-white md:text-4xl">
                    দক্ষ
                </h1>

                <p className="mt-2 text-sm font-light tracking-wide text-white/90">
                    স্থানীয় সেবা, আস্থার হাত
                </p>

            </div>
        </div>
    );
};

export default Home;