import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { AuthContext } from "../../Layout/RootLayout";
import axios from "axios";

const RoleSelect = () => {
    const navigate = useNavigate();
    const { user, setRole } = useContext(AuthContext);

    const [checking, setChecking] = useState(false);

    const checkProviderExists = async () => {
        if (!user?.uid) return false;

        const res = await axios.get(
            `https://dokkoh-server.vercel.app/providers/by-uid/${user.uid}`,
            { withCredentials: true }
        );
        return res.data.exists;
    };

    const choose = async (r) => {
        setRole(r);

        if (r === "customer") {
            navigate("/dokkho/customer/dashboard");
            return;
        }

        setChecking(true);
        try {
            const exists = await checkProviderExists();
            exists
                ? navigate("/dokkho/provider/dashboard")
                : navigate("/dokkho/provider/onboarding");
        } finally {
            setChecking(false);
        }
    };

    if (checking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-[#2C2B2B] font-medium">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4169E1] border-t-transparent mr-3"></div>
                চেক করা হচ্ছে...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-6 py-10">
            <div className="w-full max-w-4xl text-center">
                <h2 className="text-3xl font-extrabold text-[#2C2B2B] md:text-4xl">
                    দক্ষ-তে <span className="text-[#4169E1]">স্বাগতম</span>
                </h2>
                <p className="mt-3 text-gray-500 text-lg">
                    আপনি কিভাবে অ্যাপটি ব্যবহার করতে চান?
                </p>

                <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
                    {/* Customer */}
                    <div
                        onClick={() => choose("customer")}
                        className="group w-full md:w-80 cursor-pointer rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl transition"
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#008B9C]/10 text-[#008B9C]">
                                <FiSearch size={40} />
                            </div>
                            <h3 className="text-2xl font-bold">আমার সেবা প্রয়োজন</h3>
                            <p className="mt-3 text-sm text-[#086e6e]">
                                আপনার আশেপাশে সেবাদাতা খুঁজুন
                            </p>
                        </div>
                    </div>

                    {/* Provider */}
                    <div
                        onClick={() => choose("provider")}
                        className="group w-full md:w-80 cursor-pointer rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl transition"
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF9F4B]/10 text-[#ff664b]">
                                <HiOutlineBriefcase size={40} />
                            </div>
                            <h3 className="text-2xl font-bold">আমি সেবা প্রদান করি</h3>
                            <p className="mt-3 text-sm text-red-500">
                                আপনার দক্ষতা দিয়ে আয় করুন
                            </p>
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-sm text-gray-400">
                    পরবর্তীতে আপনি সেটিংস থেকে রোল পরিবর্তন করতে পারবেন
                </p>
            </div>
        </div>
    );
};

export default RoleSelect;
