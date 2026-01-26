import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { dokkhoContext } from "../../Layout/RootLayout";

const RoleSelect = () => {
    const navigate = useNavigate();
    const { providerExists, checkingProvider, setRole } = useContext(dokkhoContext);

    if (checkingProvider) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-[#2C2B2B] font-medium">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4169E1] border-t-transparent mr-3"></div>
                চেক করা হচ্ছে...
            </div>
        );
    }

    const choose = (r) => {
        setRole(r);
        if (r === "customer") {
            navigate("/dokkho/customer/dashboard");
        } else {
            providerExists
                ? navigate("/dokkho/provider/dashboard")
                : navigate("/dokkho/provider/onboarding");
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-6 py-10">
            <div className="w-full max-w-4xl text-center">

                {/* Header */}
                <h2 className="text-3xl font-extrabold text-[#2C2B2B] md:text-4xl">
                    দক্ষ-তে <span className="text-[#4169E1]">স্বাগতম</span>
                </h2>
                <p className="mt-3 text-gray-500 text-lg">
                    আপনি কিভাবে অ্যাপটি ব্যবহার করতে চান?
                </p>

                {/* Cards Container: Mobile-এ লম্বালম্বি, Tablet/Desktop-এ পাশাপাশি */}
                <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">

                    {/* Customer Card: Teal (#008B9C) Theme */}
                    <div
                        onClick={() => choose("customer")}
                        className="group relative w-full md:w-80 cursor-pointer overflow-hidden rounded-3xl border-2 border-transparent bg-white p-8 shadow-sm transition-all hover:border-[#008B9C] hover:shadow-xl active:scale-[0.98]"
                    >
                        <div className="flex flex-col items-center relative z-10">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#008B9C]/10 text-[#008B9C] group-hover:bg-[#008B9C] group-hover:text-white transition-all duration-300">
                                <FiSearch size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2C2B2B]">
                                আমার সেবা প্রয়োজন
                            </h3>
                            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                আপনার আশেপাশে বিশ্বস্ত স্থানীয় সেবাদাতাদের খুঁজুন এবং কাজ করিয়ে নিন
                            </p>
                        </div>
                        {/* Background subtle decoration */}
                        <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-[#008B9C]/5 group-hover:bg-[#008B9C]/10 transition-all"></div>
                    </div>

                    {/* Provider Card: Orange (#FF9F4B) Theme */}
                    <div
                        onClick={() => choose("provider")}
                        className="group relative w-full md:w-80 cursor-pointer overflow-hidden rounded-3xl border-2 border-transparent bg-white p-8 shadow-sm transition-all hover:border-[#FF9F4B] hover:shadow-xl active:scale-[0.98]"
                    >
                        <div className="flex flex-col items-center relative z-10">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF9F4B]/10 text-[#FF9F4B] group-hover:bg-[#FF9F4B] group-hover:text-white transition-all duration-300">
                                <HiOutlineBriefcase size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2C2B2B]">
                                আমি সেবা প্রদান করি
                            </h3>
                            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                আপনার দক্ষতা ব্যবহার করে নতুন গ্রাহক পান এবং আয় বৃদ্ধি করুন
                            </p>
                        </div>
                        {/* Background subtle decoration */}
                        <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-[#FF9F4B]/5 group-hover:bg-[#FF9F4B]/10 transition-all"></div>
                    </div>

                </div>

                {/* Info Text: Neutral Dark */}
                <p className="mt-12 text-sm text-gray-400">
                    পরবর্তীতে আপনি সেটিংস থেকে রোল পরিবর্তন করতে পারবেন
                </p>
            </div>
        </div>
    );
};

export default RoleSelect;