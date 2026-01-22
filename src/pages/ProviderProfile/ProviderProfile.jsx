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

    const {
        user,
        provider,
        providerLoading,
        logout,
    } = useContext(dokkhoContext);

    // লোডিং অবস্থা
    if (providerLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>লোড হচ্ছে...</p>
            </div>
        );
    }

    // সেফটি ফallback
    if (!provider) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>প্রোভাইডার প্রোফাইল পাওয়া যায়নি</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* হেডার */}
            <div className="w-full bg-[#1DBF73] p-6 pb-20 text-white shadow-md">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <button onClick={() => navigate(-1)}>
                        <FaArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-semibold">
                        আমার প্রোফাইল
                    </h1>
                </div>
            </div>

            {/* প্রোফাইল */}
            <div className="w-full max-w-md px-6 -mt-12">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-28 h-28 bg-[#1DBF73] rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                        {provider.name?.[0]?.toUpperCase() || "P"}
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-gray-800">
                        {provider.name}
                    </h2>

                    <p className="text-gray-500 font-medium capitalize">
                        {provider.service}
                    </p>
                </div>

                {/* তথ্য তালিকা */}
                <div className="space-y-4">
                    <InfoRow
                        icon={<FaUser />}
                        label="নাম"
                        value={provider.name}
                    />

                    <InfoRow
                        icon={<FaPhoneAlt />}
                        label="ফোন নম্বর"
                        value={user?.phoneNumber}
                    />

                    <InfoRow
                        icon={<FaBriefcase />}
                        label="ভূমিকা"
                        value="সেবা প্রদানকারী"
                    />
                </div>

                {/* লগআউট */}
                <button
                    onClick={logout}
                    className="w-full mt-10 mb-10 py-3.5 border-2 border-red-500 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-50"
                >
                    <FaSignOutAlt size={20} />
                    লগআউট
                </button>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="bg-gray-100 p-3 rounded-full text-gray-600">
            {icon}
        </div>
        <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                {label}
            </p>
            <p className="text-gray-800 font-semibold">
                {value || "-"}
            </p>
        </div>
    </div>
);

export default ProviderProfile;
