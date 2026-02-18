import { useContext, useState } from "react";
import {
    FaArrowLeft,
    FaEdit,
    FaUser,
    FaPhoneAlt,
    FaBriefcase,
    FaMapMarkerAlt,
    FaClock,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaIdCard,
    FaArrowRight,
    FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { ProviderContext } from "../../Layout/ProviderLayout";
import { AuthContext } from "../../Layout/RootLayout";
import axios from "axios";

const ProviderProfile = () => {
    const navigate = useNavigate();
    const { provider, checkingProvider } = useContext(ProviderContext);
    const { user, logout } = useContext(AuthContext);
    const [switching, setSwitching] = useState(false);

    if (checkingProvider) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <p className="text-lg font-bold">প্রোফাইল পাওয়া যায়নি</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-blue-600">
                    ফিরে যান
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white border-b">
                <div className="max-w-6xl mx-auto h-14 px-4 flex items-center justify-between">
                    <button onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                    </button>
                    <h1 className="font-bold">প্রোভাইডার প্রোফাইল</h1>
                    <button onClick={() => navigate("/dokkho/provider/profile/edit")}>
                        <FaEdit />
                    </button>
                </div>
            </div>

            {/* Profile Card */}
            <div className="max-w-6xl mx-auto p-4">
                <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <img
                        src={provider.profileImage}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                        <h2 className="font-bold text-lg">{provider.name}</h2>
                        <p className="text-sm text-gray-500">{provider.phoneNumber || user?.phoneNumber}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full">
                            {provider.serviceName}
                        </span>
                    </div>
                </div>

                {/* Info Sections */}
                <div className="mt-4 space-y-4">

                    <InfoItem icon={<FaUser />} label="নাম" value={provider.name} />
                    <InfoItem icon={<FaPhoneAlt />} label="ফোন নম্বর" value={provider.phoneNumber || user?.phoneNumber} />
                    <InfoItem icon={<FaBriefcase />} label="সার্ভিস" value={provider.serviceName} />
                    <InfoItem icon={<FaMapMarkerAlt />} label="লোকেশন" value={`${provider.locationParent} - ${provider.locationSub}`} />
                    <InfoItem icon={<FaClock />} label="অভিজ্ঞতা" value={`${provider.experience} বছর`} />
                    <InfoItem icon={<FaMoneyBillWave />} label="মূল্য" value={`৳ ${provider.pricing?.amount} / ${provider.pricing?.unit === "hour" ? "ঘন্টা" : provider.pricing?.unit}`} />
                    <InfoItem
                        icon={<FaCalendarAlt />}
                        label="উপলব্ধতা"
                        value={Object.keys(provider.availabilityDays || {}).join(", ")}
                    />
                    <InfoItem icon={<FaIdCard />} label="KYC স্ট্যাটাস" value={provider.kycStatus} />

                </div>

                {/* Mode Switch */}
                <button
                    disabled={switching}
                    onClick={async () => {
                        setSwitching(true);
                        await axios.patch(
                            `http://localhost:3000/users/${user.uid}/customer-role`,
                            { phoneNumber: user.phoneNumber },
                            { withCredentials: true }
                        );
                        navigate("/dokkho/customer/dashboard");
                    }}
                    className="w-full mt-6 py-3 border border-blue-600 text-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 disabled:opacity-60"
                >
                    কাস্টমার মোডে যান <FaArrowRight />
                </button>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="w-full mt-3 py-3 border border-red-500 text-red-500 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-50"
                >
                    লগআউট করুন <FaSignOutAlt />
                </button>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border">
        <div className="text-blue-600">{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold">{value || "-"}</p>
        </div>
    </div>
);

export default ProviderProfile;
