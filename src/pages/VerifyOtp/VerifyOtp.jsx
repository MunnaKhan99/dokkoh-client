import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { LuShieldCheck } from "react-icons/lu";
import { AuthContext } from "../../Layout/RootLayout";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const { setUser, loading } = useContext(AuthContext);

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

                {/* Icon Container: Primary Blue (#4169E1) ব্যবহার করা হয়েছে */}
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#4169E1] shadow-lg shadow-blue-200 transform rotate-3">
                    <LuShieldCheck size={45} className="text-white" />
                </div>

                {/* Title: Neutral Dark (#2C2B2B) */}
                <h2 className="text-2xl font-extrabold text-[#2C2B2B] md:text-3xl">
                    ওটিপি (OTP) <span className="text-[#4169E1]">যাচাই করুন</span>
                </h2>
                <p className="mt-3 text-gray-500 font-medium px-4">
                    আপনার নম্বরে পাঠানো ৬-ডিজিট কোডটি লিখুন
                </p>

                {/* OTP Inputs */}
                <form onSubmit={handleVerify} className="mt-10">
                    <div className="flex justify-center gap-2 md:gap-3">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={value}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                // Focus হলে Border Color হবে Primary Blue (#4169E1)
                                className="h-12 w-12 md:h-14 md:w-14 rounded-2xl border-2 border-gray-100 bg-gray-50 text-center text-xl font-bold text-[#2C2B2B] focus:border-[#4169E1] focus:bg-white focus:outline-none transition-all shadow-sm"
                            />
                        ))}
                    </div>

                    {/* Resend OTP Section: Supporting Orange (#FF9F4B) */}
                    <p className="mt-8 text-sm text-gray-500">
                        কোড পাননি? <button type="button" className="text-[#FF9F4B] font-bold hover:underline">আবার পাঠান</button>
                    </p>

                    {/* Submit Button: Primary Blue (#4169E1) ও Hover-এ Teal (#008B9C) */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full rounded-2xl bg-[#4169E1] py-4 text-lg font-bold text-white shadow-xl shadow-blue-100 transition-all hover:bg-[#008B9C] active:scale-95 disabled:opacity-60"
                    >
                        {loading ? "যাচাই করা হচ্ছে..." : "যাচাই করুন এবং এগিয়ে যান"}
                    </button>
                </form>

                {/* Cancel/Back Button: Neutral Gray style */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 text-gray-400 font-medium text-sm hover:text-[#D62C49] transition-colors"
                >
                    নম্বর পরিবর্তন করুন
                </button>
            </div>
        </div>
    );
};

export default VerifyOtp;
