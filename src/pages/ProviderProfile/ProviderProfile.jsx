import { useContext } from "react";
import {
    FaUser,
    FaPhoneAlt,
    FaBriefcase,
    FaSignOutAlt,
    FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { dokkhoContext } from "../../Layout/RootLayout";

const ProviderProfile = () => {
    const navigate = useNavigate();
    const { user, provider, providerLoading, logout } = useContext(dokkhoContext);

    // লোডিং স্টেট (ব্র্যান্ড কালার স্পিনার সহ)
    if (providerLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4169E1] border-t-transparent"></div>
            </div>
        );
    }

    // প্রোফাইল না পাওয়া গেলে
    if (!provider) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
                <div className="bg-red-50 p-6 rounded-3xl mb-4">
                    <FaUser size={50} className="text-[#D62C49] opacity-20" />
                </div>
                <h2 className="text-xl font-bold text-[#2C2B2B]">প্রোফাইল পাওয়া যায়নি</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-[#4169E1] font-bold flex items-center gap-2"
                >
                    <FaArrowLeft /> ফিরে যান
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* হেডার: Primary Blue (#4169E1) */}
            <div className="w-full bg-[#4169E1] pt-8 pb-24 px-6 md:px-12 text-white rounded-b-[40px] shadow-lg">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90"
                    >
                        <FaArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                        প্রোভাইডার প্রোফাইল
                    </h1>
                </div>
            </div>

            {/* মেইন কন্টেন্ট এলাকা */}
            <div className="max-w-4xl mx-auto px-6 -mt-16 pb-12">

                {/* প্রোফাইল কার্ড */}
                <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col items-center">
                    <div className="relative group">
                        <div className="w-28 h-28 md:w-32 md:h-32 bg-[#008B9C] rounded-[35%] flex items-center justify-center text-white text-4xl font-black border-4 border-white shadow-xl transition-transform group-hover:rotate-6">
                            {provider.name?.[0]?.toUpperCase() || "P"}
                        </div>
                        {/* অনলাইন স্ট্যাটাস ইন্ডিকেটর */}
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>

                    <h2 className="mt-6 text-2xl md:text-3xl font-black text-[#2C2B2B]">
                        {provider.name}
                    </h2>

                    <div className="mt-2 px-4 py-1.5 bg-[#FF9F4B]/10 text-[#FF9F4B] rounded-xl text-sm font-black uppercase tracking-wider">
                        {provider.service || "সেবাদাতা"}
                    </div>
                </div>

                {/* ইনফো গ্রিড: মোবাইলে ১টি, ট্যাবলেট/ডেস্কটপে ২টি কলাম */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow
                        icon={<FaUser />}
                        label="পুরো নাম"
                        value={provider.name}
                        accentColor="text-[#008B9C]"
                        bgColor="bg-[#008B9C]/10"
                    />

                    <InfoRow
                        icon={<FaPhoneAlt />}
                        label="মোবাইল নম্বর"
                        value={user?.phoneNumber}
                        accentColor="text-[#4169E1]"
                        bgColor="bg-[#4169E1]/10"
                    />

                    <InfoRow
                        icon={<FaBriefcase />}
                        label="পেশা / সার্ভিস"
                        value={provider.service || "General"}
                        accentColor="text-[#FF9F4B]"
                        bgColor="bg-[#FF9F4B]/10"
                    />

                    {/* একটি এক্সট্রা কার্ড স্ট্যাটাসের জন্য */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center gap-4">
                        <div className="bg-green-50 text-green-600 p-4 rounded-2xl">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black text-gray-400">অ্যাকাউন্ট স্ট্যাটাস</p>
                            <p className="text-[#2C2B2B] font-bold">অ্যাক্টিভ</p>
                        </div>
                    </div>
                </div>

                {/* লগআউট বাটন: Red (#D62C49) */}
                <button
                    onClick={logout}
                    className="w-full mt-12 mb-10 py-4 border-2 border-[#D62C49] text-[#D62C49] rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-[#D62C49] hover:text-white active:scale-95 shadow-lg shadow-red-50"
                >
                    <FaSignOutAlt size={20} />
                    লগআউট করুন
                </button>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value, accentColor, bgColor }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition-all hover:shadow-md">
        <div className={`${bgColor} ${accentColor} p-4 rounded-2xl text-xl`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">
                {label}
            </p>
            <p className="text-[#2C2B2B] font-extrabold text-lg">
                {value || "-"}
            </p>
        </div>
    </div>
);

export default ProviderProfile;