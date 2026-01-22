import React, { useContext } from 'react';
import { FaBolt, FaWrench, FaPaintRoller, FaRegUserCircle } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { IoSearchOutline, IoBookOutline } from 'react-icons/io5';
import { dokkhoContext } from '../../Layout/RootLayout';
import { Link } from 'react-router';

const CustomerDashboard = () => {
    const { user } = useContext(dokkhoContext);
    console.log(user);
    const popularServices = [
        { name: 'ইলেক্ট্রিশিয়ান', icon: <FaBolt />, color: 'bg-yellow-100', iconColor: 'text-yellow-500' },
        { name: 'প্লাম্বার', icon: <FaWrench />, color: 'bg-blue-100', iconColor: 'text-blue-500' },
        { name: 'হোম টিউটর', icon: <IoBookOutline />, color: 'bg-purple-100', iconColor: 'text-purple-500' },
        { name: 'পেইন্টার', icon: <FaPaintRoller />, color: 'bg-orange-100', iconColor: 'text-orange-500' },
    ];

    const recentSearches = ['ইলেক্ট্রিশিয়ান', 'প্লাম্বার', 'এসি মেরামত'];

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* হেডার এবং ব্যানার */}
            <div className="bg-[#0FA958] pt-6 pb-12 px-8 text-white relative">
                <div className="flex justify-between items-start max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">সেবা-সাথী</h1>
                        <p className="text-sm opacity-90">আপনার বিশ্বস্ত স্থানীয় সেবা মাধ্যম</p>
                    </div>
                    <Link to='/dokkho/customer/profile' className="text-3xl opacity-90 hover:opacity-100 transition-opacity">
                        <FaRegUserCircle />
                    </Link>
                </div>

                {/* লোকেশন বার */}
                <div className="max-w-7xl mx-auto mt-8">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <MdLocationOn className="text-white text-xl" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider font-bold opacity-80">বর্তমান অবস্থান</p>
                            <p className="text-sm font-semibold">ধানমণ্ডি, ঢাকা</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* মেইন কন্টেন্ট */}
            <div className="max-w-7xl mx-auto px-8 -mt-6">
                {/* সার্চ বার */}
                <div className="relative group shadow-sm">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 text-xl">
                        <IoSearchOutline />
                    </span>
                    <input
                        type="text"
                        placeholder="প্রয়োজনীয় সেবাটি খুঁজুন..."
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none shadow-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700 transition-all placeholder:text-gray-400"
                    />
                </div>

                {/* জনপ্রিয় সেবাসমূহ */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-[#0FA958] pl-3">জনপ্রিয় সেবাসমূহ</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularServices.map((service, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                            >
                                <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center text-2xl ${service.iconColor}`}>
                                    {service.icon}
                                </div>
                                <span className="font-bold text-gray-700">{service.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* সাম্প্রতিক সার্চ */}
                <div className="mt-12 pb-10">
                    <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wide">সাম্প্রতিক সার্চ</h3>
                    <div className="flex flex-wrap gap-3">
                        {recentSearches.map((search, index) => (
                            <button
                                key={index}
                                className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-colors"
                            >
                                {search}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;