import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { LuShieldCheck } from "react-icons/lu";
import { dokkhoContext } from "../../Layout/RootLayout";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(dokkhoContext);

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    // Handle input change + auto focus
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const finalOtp = otp.join("");

            if (finalOtp.length !== 6) {
                alert("৬ সংখ্যার OTP দিন");
                return;
            }


            const result = await window.confirmationResult.confirm(finalOtp);


            setUser(result.user);


            navigate("/dokkho/role");
        } catch (error) {
            console.error("OTP Verify Error:", error);
            alert("ভুল OTP");
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6">
            <div className="w-full max-w-md text-center">
                {/* Icon */}
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#2563EB]">
                    <LuShieldCheck size={40} className="text-white" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                    ওটিপি (OTP) যাচাই করুন
                </h2>
                <p className="mt-2 text-gray-500">
                    আপনার নম্বরে পাঠানো ৬-ডিজিট কোডটি লিখুন
                </p>

                {/* OTP inputs */}
                <form onSubmit={handleVerify} className="mt-10">
                    <div className="flex justify-center gap-2">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={value}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="h-12 w-12 rounded-xl border-2 border-gray-200 text-center text-xl font-bold focus:border-[#0FA958] focus:outline-none transition-all shadow-sm"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full rounded-xl bg-[#82E0C1] py-4 text-lg font-bold text-white transition-all hover:bg-[#2563EB]"
                    >
                        যাচাই করুন এবং এগিয়ে যান
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
