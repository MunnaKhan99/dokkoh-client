import { useContext } from "react";
import {
    FaStar,
    FaMapMarkerAlt,
    FaUser,
    FaCamera,
    FaArrowLeft,
    FaArrowRight,
    FaRegUserCircle,
} from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { ProviderContext } from "../../Layout/ProviderLayout";
import NoProvider from "../NoProvider/NoProvider";

const ProviderDashboard = () => {
    const navigate = useNavigate()
    const {
        provider,
        checkingProvider,
        toggleProviderAvailability,
    } = useContext(ProviderContext);

    console.log(provider);
    if (checkingProvider) {
        return <p className="flex justify-center h-screen"><span className="loading loading-spinner loading-xl"></span></p>;
    }

    if (!provider) {
        return <NoProvider />;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-12">

            {/* Header: Primary Blue (#4169E1) */}
            <div className="bg-[#4169E1] text-white px-6 md:px-12 pt-10 pb-28 rounded-b-[40px] shadow-lg relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-20px] right-[-20px] h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>

                <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black tracking-tight">
                            আমার ড্যাশবোর্ড
                        </h1>
                        <p className="text-[10px] md:text-sm opacity-80 uppercase font-bold tracking-widest mt-1">
                            সার্ভিস প্রোফাইল পরিচালনা করুন
                        </p>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        {/* Customer Mode Toggle: Shimmer Effect with Orange (#FF9F4B) */}
                        <Link
                            to="/dokkho/customer/dashboard"
                            className="relative p-[1.5px] overflow-hidden rounded-full inline-block group shadow-xl transition-all active:scale-95"
                        >
                            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF9F4B_0%,#FFF_50%,#FF9F4B_100%)]" />
                            <div className="relative px-4 py-2 bg-white rounded-full text-[10px] md:text-xs font-black text-[#2C2B2B]">
                                কাস্টমার মোড
                            </div>
                        </Link>

                        <button onClick={() => { navigate('/dokkho/provider/profile') }} className="hover:text-[#FF9F4B] transition-colors">
                            <FaRegUserCircle size={32} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20">

                {/* Profile Card */}
                <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-gray-50 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                        {/* Profile Info */}
                        <div className="flex items-center gap-5 md:gap-8">
                            <div className="relative">
                                <div className="h-20 w-20 md:h-28 md:w-28 rounded-3xl bg-[#008B9C] flex items-center justify-center text-white text-3xl md:text-4xl font-black border-4 border-white shadow-lg">
                                    {provider.name?.slice(0, 1).toUpperCase()}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-[#4169E1] p-2.5 rounded-xl border-4 border-white text-white shadow-md cursor-pointer hover:scale-110 transition-transform">
                                    <FaCamera size={14} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-black text-2xl md:text-3xl text-[#2C2B2B]">
                                    {provider.name}
                                </h2>
                                <p className="text-[#008B9C] font-bold text-sm md:text-lg capitalize">
                                    {provider.serviceName || "পেশাদার সেবাদাতা"}
                                </p>

                                <div className="flex items-center gap-1.5 mt-2 bg-yellow-50 w-fit px-3 py-1 rounded-lg">
                                    <FaStar className="text-[#FF9F4B]" />
                                    <span className="font-black text-[#2C2B2B] text-sm">
                                        {provider.rating || "5.0"}
                                    </span>
                                    <span className="text-gray-400 text-xs font-bold">
                                        ({provider.ratingCount || 0} রিভিউ)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Availability Toggle: Palette Specific */}
                        <div className="bg-gray-50 p-5 rounded-[24px] border border-gray-100 lg:w-72">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-black text-[#2C2B2B] text-sm">স্ট্যাটাস</p>
                                    <p className="text-[10px] text-gray-400 font-bold italic uppercase tracking-tighter">
                                        {provider.availability ? "গ্রাহকরা আপনাকে দেখতে পাচ্ছেন" : "আপনি বর্তমানে অফলাইনে"}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <input
                                        type="checkbox"
                                        checked={provider.availability}
                                        onChange={toggleProviderAvailability}
                                        className={`toggle toggle-lg ${provider.availability ? "bg-[#008B9C] border-[#008B9C]" : "bg-gray-300"}`}
                                    />
                                    <span className={`text-[10px] font-black uppercase ${provider.availability ? "text-[#008B9C]" : "text-[#D62C49]"}`}>
                                        {provider.availability ? "অনলাইন" : "অফলাইন"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid: 3 Columns Desktop, 3 Columns Mobile (Small Cards) */}
                <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
                    <StatCard count={provider.ratingCount || 0} label="রিভিউ" color="text-[#008B9C]" />
                    <StatCard count={provider.rating || "5.0"} label="রেটিং" color="text-[#FF9F4B]" />
                    <StatCard count={provider.experience || "১+"} label="অভিজ্ঞতা" color="text-[#4169E1]" />
                </div>

                {/* Quick Actions Section */}
                <div>
                    <h3 className="text-[#2C2B2B] font-black text-xl mb-6 ml-1 flex items-center gap-2">
                        <span className="w-2 h-6 bg-[#4169E1] rounded-full"></span>
                        কুইক অ্যাকশন
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ActionItem
                            icon={<FaMapMarkerAlt />}
                            title="লোকেশন পরিবর্তন"
                            desc="সার্ভিস এরিয়া আপডেট করুন"
                            iconBg="bg-[#008B9C]/10"
                            iconColor="text-[#008B9C]"
                        />
                        <ActionItem
                            icon={<MdEditNote size={28} />}
                            title="সার্ভিস পরিবর্তন"
                            desc="অফার করা সার্ভিসগুলো এডিট করুন"
                            iconBg="bg-[#4169E1]/10"
                            iconColor="text-[#4169E1]"
                        />
                        <ActionItem
                            icon={<FaCamera />}
                            title="ছবি আপলোড"
                            desc="কাজের ছবি বা প্রোফাইল আপডেট করুন"
                            iconBg="bg-[#FF9F4B]/10"
                            iconColor="text-[#FF9F4B]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

/* Helper Component: Stat Card */
const StatCard = ({ count, label, color }) => (
    <div className="bg-white rounded-3xl p-4 md:p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <p className={`${color} text-xl md:text-3xl font-black tracking-tighter`}>{count}</p>
        <p className="text-[10px] md:text-xs text-gray-400 font-black uppercase mt-1 tracking-widest">{label}</p>
    </div>
);

/* Helper Component: Action Item */
const ActionItem = ({ icon, title, desc, iconBg, iconColor }) => (
    <div className="bg-white rounded-[24px] p-5 flex items-center gap-5 shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
        <div className={`${iconBg} ${iconColor} p-4 rounded-2xl text-2xl group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div>
            <p className="font-black text-[#2C2B2B] text-base md:text-lg tracking-tight">
                {title}
            </p>
            <p className="text-xs text-gray-400 font-medium">
                {desc}
            </p>
        </div>
    </div>
);

export default ProviderDashboard;
