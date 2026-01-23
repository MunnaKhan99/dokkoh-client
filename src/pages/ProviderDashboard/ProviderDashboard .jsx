import { useContext } from "react";
import { dokkhoContext } from "../../Layout/RootLayout";
import {
    FaStar,
    FaMapMarkerAlt,
    FaUser,
    FaCamera,
} from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { Link } from "react-router";

const ProviderDashboard = () => {
    const {
        provider,
        providerLoading,
        toggleProviderAvailability,
    } = useContext(dokkhoContext);
    console.log(provider);
    if (providerLoading) {
        return <p className="p-10">Loading...</p>;
    }

    if (!provider) {
        return <p className="p-10">No provider data found</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-[#0FA958] text-white px-6 md:px-16 pt-10 pb-24">
                <div className="max-w-6xl mx-auto flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">আমার ড্যাশবোর্ড</h1>
                        <p className="text-sm opacity-90 mt-1">
                            আপনার সার্ভিস প্রোফাইল পরিচালনা করুন
                        </p>
                    </div>

                    <div className="border-2 rounded-full p-2">
                        <Link to="/dokkho/provider/profile">
                            <FaUser className="text-xl" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="max-w-6xl mx-auto px-6 -mt-16">

                {/* Profile Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                        {/* Profile Info */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-[#0FA958] flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-md">
                                    {provider.name?.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="absolute bottom-1 right-1 bg-[#0FA958] p-2 rounded-full border-2 border-white text-white text-xs">
                                    <FaCamera />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-bold text-2xl text-gray-800">
                                    {provider.name}
                                </h2>
                                <p className="text-gray-500 font-medium text-lg capitalize">
                                    {provider.serviceName}
                                </p>

                                <div className="flex items-center gap-1 mt-1">
                                    <FaStar className="text-yellow-400" />
                                    <span className="font-bold text-gray-700 text-lg">
                                        {provider.rating}
                                    </span>
                                    <span className="text-gray-400">
                                        ({provider.ratingCount} রিভিউ)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-center gap-10">
                                <div>
                                    <p className="font-bold text-gray-800">
                                        অ্যাভেইলেবিলিটি স্ট্যাটাস
                                    </p>
                                    <p className="text-xs text-gray-400 italic">
                                        গ্রাহকরা আপনাকে দেখতে পাচ্ছেন
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`font-bold ${provider.availability
                                            ? "text-[#0FA958]"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {provider.availability ? "ফ্রি" : "ব্যস্ত"}
                                    </span>

                                    <input
                                        type="checkbox"
                                        checked={provider.availability}
                                        onChange={toggleProviderAvailability}
                                        className="toggle toggle-success"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                        <p className="text-[#0FA958] text-3xl font-black">
                            {provider.ratingCount || 127}
                        </p>
                        <p className="text-gray-400 font-medium mt-1 uppercase tracking-wide">
                            রিভিউ
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                        <p className="text-yellow-500 text-3xl font-black">
                            {provider.rating || 4.8}
                        </p>
                        <p className="text-gray-400 font-medium mt-1 uppercase tracking-wide">
                            রেটিং
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                        <p className="text-[#0FA958] text-3xl font-black">
                            {provider.experience || "১০+"}
                        </p>
                        <p className="text-gray-400 font-medium mt-1 uppercase tracking-wide">
                            বছর
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h3 className="text-gray-500 font-bold text-lg mb-5 ml-2">
                        কুইক অ্যাকশন
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-5 flex items-center gap-5 shadow-sm border border-gray-50">
                            <div className="bg-green-50 p-4 rounded-2xl text-[#0FA958]">
                                <FaMapMarkerAlt className="text-2xl" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-lg">
                                    লোকেশন পরিবর্তন করুন
                                </p>
                                <p className="text-gray-400">
                                    আপনার সার্ভিস এরিয়া আপডেট করুন
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 flex items-center gap-5 shadow-sm border border-gray-50">
                            <div className="bg-blue-50 p-4 rounded-2xl text-blue-500">
                                <MdEditNote className="text-3xl" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-lg">
                                    সার্ভিস পরিবর্তন করুন
                                </p>
                                <p className="text-gray-400">
                                    আপনার অফার করা সার্ভিসগুলো আপডেট করুন
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 flex items-center gap-5 shadow-sm border border-gray-50">
                            <div className="bg-yellow-50 p-4 rounded-2xl text-yellow-600">
                                <FaCamera className="text-2xl" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-lg">
                                    ছবি আপলোড করুন
                                </p>
                                <p className="text-gray-400">
                                    আপনার প্রোফাইল ছবি আপডেট করুন
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProviderDashboard;
