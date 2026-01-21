import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { FiSearch } from 'react-icons/fi'; // সার্চ আইকন
import { HiOutlineBriefcase } from 'react-icons/hi'; // ব্রিফকেস আইকন
import { dokkhoContext } from '../../Layout/RootLayout';

const RoleSelect = () => {
    const navigate = useNavigate();
    const { user } = useContext(dokkhoContext)
    console.log(user);

    const handleRoleSelection = (role) => {
        console.log("Selected Role:", role);
        // এখানে আপনার পরবর্তী পাথে পাঠিয়ে দিতে পারেন
        navigate(`/dokkho/${role}/onboarding`);
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F9FAFB] px-6">
            <div className="w-full max-w-2xl text-center">

                {/* শিরোনাম */}
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                    দক্ষ-তে স্বাগতম
                </h2>
                <p className="mt-2 text-gray-500">
                    আপনি কিভাবে অ্যাপটি ব্যবহার করতে চান?
                </p>

                <div className="mt-10 flex flex-col gap-6">

                    {/* কার্ড ১: সেবা প্রয়োজন (গ্রাহক) */}
                    <div
                        onClick={() => handleRoleSelection('customer')}
                        className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-[#0FA958] hover:shadow-md active:scale-[0.98]"
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F6EE]">
                                <FiSearch size={35} className="text-[#0FA958]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">আমার সেবা প্রয়োজন</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                আপনার আশেপাশে বিশ্বস্ত স্থানীয় সেবাদাতাদের খুঁজুন
                            </p>
                        </div>
                    </div>

                    {/* কার্ড ২: সেবা প্রদান করি (সেবাদাতা) */}
                    <div
                        onClick={() => handleRoleSelection('provider')}
                        className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-[#FBBF24] hover:shadow-md active:scale-[0.98]"
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFFBEB]">
                                <HiOutlineBriefcase size={35} className="text-[#FBBF24]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">আমি সেবা প্রদান করি</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                যাদের আপনার দক্ষতা প্রয়োজন সেই গ্রাহকদের সাথে যুক্ত হন
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default RoleSelect;