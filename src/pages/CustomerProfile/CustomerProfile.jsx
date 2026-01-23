import { useContext } from "react";
import { useNavigate } from "react-router";
import {
    FaPhoneAlt,
    FaBriefcase,
    FaSignOutAlt,
    FaArrowLeft,
} from "react-icons/fa";
import { dokkhoContext } from "../../Layout/RootLayout";

const CustomerProfile = () => {
    const { user, role, logout, loading } = useContext(dokkhoContext);
    const navigate = useNavigate();

    if (loading) return <p className="text-center mt-20">লোড হচ্ছে...</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-[#1DBF73] p-6 text-white flex items-center gap-4">
                <button onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h1 className="text-xl font-semibold">আমার প্রোফাইল</h1>
            </div>

            <div className="max-w-md mx-auto px-6 -mt-10">
                <div className="bg-white rounded-2xl p-6 text-center shadow">
                    <h2 className="text-xl font-bold">{user?.phoneNumber}</h2>
                    <p className="text-gray-500 capitalize">{role}</p>
                </div>

                <div className="mt-6 space-y-4">
                    <Info label="ফোন নম্বর" value={user?.phoneNumber} icon={<FaPhoneAlt />} />
                    <Info label="ভূমিকা" value={role} icon={<FaBriefcase />} />
                </div>

                <button
                    onClick={logout}
                    className="w-full mt-10 py-3 border-2 border-red-500 text-red-500 rounded-xl flex justify-center gap-3"
                >
                    <FaSignOutAlt /> লগআউট
                </button>
            </div>
        </div>
    );
};

const Info = ({ icon, label, value }) => (
    <div className="bg-white p-4 rounded-xl shadow flex gap-4 items-center">
        <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-xs text-gray-400 font-bold">{label}</p>
            <p className="font-semibold">{value || "-"}</p>
        </div>
    </div>
);

export default CustomerProfile;
