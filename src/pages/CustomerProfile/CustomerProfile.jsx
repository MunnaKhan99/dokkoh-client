import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import {
    FaArrowLeft,
    FaRegUser,
    FaPhoneAlt,
    FaSignOutAlt,
    FaArrowRight
} from "react-icons/fa";
import { AuthContext } from "../../Layout/RootLayout";
import { CustomerContext } from "../../Layout/CustomerLayout";
import axios from "axios";

const CustomerProfile = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const { profile } = useContext(CustomerContext);
    const navigate = useNavigate();
    const [switching, setSwitching] = useState(false);
    const [error, setError] = useState(null);

    const profileImage =
        profile?.profileImage || "https://i.pravatar.cc/150?img=11";

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const handleSwitchToProvider = async () => {
        if (!user?.uid || switching) return;

        try {
            setSwitching(true);
            setError(null);

            const res = await axios.get(
                `https://dokkoh-server.vercel.app/providers/by-uid/${user.uid}`,
                { withCredentials: true }
            );

            if (res?.data?.exists) {
                navigate("/dokkho/provider/dashboard");
            } else {
                navigate("/dokkho/provider/onboarding");
            }
        } catch (err) {
            console.error("Provider check failed", err);
            setError("প্রোভাইডার স্ট্যাটাস চেক করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setSwitching(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4169E1] border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-gray-800 font-sans">
            {/* Header */}
            <div className="bg-white sticky top-0 z-40">
                <div className="max-w-md mx-auto px-4 h-16 flex items-center relative border-b border-gray-100">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-4 text-gray-600 p-1 hover:bg-gray-50 rounded-full transition"
                        aria-label="Back"
                    >
                        <FaArrowLeft size={18} />
                    </button>
                    <h1 className="w-full text-center text-lg font-bold text-gray-800">
                        গ্রাহক প্রোফাইল
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-md mx-auto px-4 py-6 space-y-5">

                {/* Profile Info */}
                <div className="bg-white rounded-2xl p-5 shadow flex items-center gap-4">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                        <h2 className="text-lg font-bold">
                            {profile?.name || "নাম সেট করা নেই"}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {profile?.phoneNumber || user?.phoneNumber || "মোবাইল নম্বর নেই"}
                        </p>
                    </div>
                </div>

                {/* Readonly Fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">নাম</label>
                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-sm">
                        <FaRegUser className="text-gray-400" size={16} />
                        <input
                            readOnly
                            type="text"
                            value={profile?.name || "নাম সেট করা নেই"}
                            className="flex-1 bg-transparent outline-none text-[15px]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">ফোন নম্বর</label>
                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-sm">
                        <FaPhoneAlt className="text-gray-400 rotate-90" size={16} />
                        <input
                            readOnly
                            type="text"
                            value={profile?.phoneNumber || user?.phoneNumber || "মোবাইল নম্বর নেই"}
                            className="flex-1 bg-transparent outline-none text-[15px]"
                        />
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {error}
                    </div>
                )}

                {/* Switch Button */}
                <button
                    onClick={handleSwitchToProvider}
                    disabled={switching}
                    className="w-full bg-white border border-blue-600 text-blue-600 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition shadow-sm disabled:opacity-60"
                >
                    {switching ? "চেক করা হচ্ছে..." : "প্রোভাইডার মোডে যান"}
                    <FaArrowRight size={16} />
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-white border border-red-500 text-red-500 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition shadow-sm"
                >
                    লগআউট করুন <FaSignOutAlt size={16} />
                </button>
            </div>
        </div>
    );
};

export default CustomerProfile;
