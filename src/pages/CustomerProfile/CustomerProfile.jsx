import { useContext } from "react";
import { useNavigate } from "react-router";
import {
    FaPhoneAlt,
    FaBriefcase,
    FaSignOutAlt,
    FaArrowLeft,
    FaUserCircle,
} from "react-icons/fa";
import { AuthContext } from "../../Layout/RootLayout";

const CustomerProfile = () => {
    const { role, user, loading, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4169E1] border-t-transparent"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header: Primary Blue (#4169E1) */}
            <div className="bg-[#4169E1] pt-8 pb-24 px-6 md:px-12 text-white flex items-center gap-4 rounded-b-[40px] shadow-lg">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="text-xl md:text-2xl font-bold">আমার প্রোফাইল</h1>
            </div>

            {/* Profile Content */}
            <div className="max-w-2xl mx-auto px-6 -mt-16 pb-12">

                {/* User Card */}
                <div className="bg-white rounded-3xl p-8 text-center shadow-xl shadow-blue-900/5 border border-gray-100">
                    <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md text-[#4169E1]">
                        <FaUserCircle size={80} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#2C2B2B]">{user?.phoneNumber || "ব্যবহারকারী"}</h2>
                    <div className="mt-2 inline-block px-4 py-1 bg-[#008B9C]/10 text-[#008B9C] rounded-full text-sm font-bold capitalize">
                        {role === 'customer' ? 'গ্রাহক' : role}
                    </div>
                </div>

                {/* Info List */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Info
                        label="ফোন নম্বর"
                        value={user?.phoneNumber}
                        icon={<FaPhoneAlt />}
                        iconBg="bg-[#4169E1]/10"
                        iconColor="text-[#4169E1]"
                    />
                    <Info
                        label="অ্যাকাউন্ট টাইপ"
                        value={role === 'customer' ? 'গ্রাহক' : 'প্রোভাইডার'}
                        icon={<FaBriefcase />}
                        iconBg="bg-[#FF9F4B]/10"
                        iconColor="text-[#FF9F4B]"
                    />
                </div>

                {/* Logout Button: Palette Red (#D62C49) */}
                <button
                    onClick={logout}
                    className="w-full mt-12 py-4 border-2 border-[#D62C49] text-[#D62C49] rounded-2xl font-bold flex justify-center items-center gap-3 hover:bg-[#D62C49] hover:text-white transition-all duration-300 active:scale-95 shadow-lg shadow-red-100"
                >
                    <FaSignOutAlt /> লগআউট করুন
                </button>

                {/* Footer Version */}
                <p className="text-center mt-10 text-gray-300 text-xs font-medium uppercase tracking-widest">
                    Dokkho App Version 1.0.2
                </p>
            </div>
        </div>
    );
};

const Info = ({ icon, label, value, iconBg, iconColor }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex gap-5 items-center hover:shadow-md transition-shadow">
        <div className={`${iconBg} ${iconColor} p-4 rounded-2xl text-xl`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{label}</p>
            <p className="font-bold text-[#2C2B2B] text-lg">{value || "তথ্য নেই"}</p>
        </div>
    </div>
);

export default CustomerProfile;