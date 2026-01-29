import React from "react";
import { useNavigate } from "react-router";

const NoProvider = () => {
    const navigate = useNavigate();

    const goToOnboarding = () => {
        navigate("/dokkho/provider/onboarding");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full rounded-3xl bg-white p-8 text-center shadow-lg">
                <h2 className="text-2xl font-bold text-[#2C2B2B]">
                    কোনো প্রোভাইডার পাওয়া যায়নি
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                    আপনি এখনো প্রোভাইডার হিসেবে রেজিস্টার করেননি।
                    শুরু করতে নিচের বাটনে ক্লিক করুন।
                </p>

                <button
                    onClick={goToOnboarding}
                    className="mt-6 w-full rounded-xl bg-[#4169E1] py-3 text-white font-semibold transition hover:bg-[#365bd6] active:scale-95"
                >
                    প্রোভাইডার হিসেবে শুরু করুন
                </button>
            </div>
        </div>
    );
};

export default NoProvider;
