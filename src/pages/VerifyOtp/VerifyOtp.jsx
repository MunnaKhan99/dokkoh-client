import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Layout/RootLayout";
import Swal from "sweetalert2";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    // লোকাল স্টেট ফর প্রসেসিং
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isProcessing, setIsProcessing] = useState(false);
    const inputRefs = useRef([]);

    // ওটিপি ইনপুট এবং অটো-ফোকাস হ্যান্ডলার
    const handleChange = (element, index) => {
        const value = element.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // পরের বক্সে ফোকাস
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // ব্যাকস্পেস হ্যান্ডলার
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            Swal.fire({
                icon: "warning",
                title: "অসম্পূর্ণ ওটিপি",
                text: "দয়া করে ৬ সংখ্যার সঠিক কোডটি দিন",
                confirmButtonColor: "#fb7185", // rose-400
            });
            return;
        }

        try {
            setIsProcessing(true);

            // Firebase Verification
            const result = await window.confirmationResult.confirm(finalOtp);
            setUser(result.user);

            // সফল হলে এলার্ট দেখাবে
            await Swal.fire({
                icon: "success",
                title: "সফল যাচাইকরণ!",
                text: "আপনার ওটিপি সফলভাবে যাচাই করা হয়েছে।",
                timer: 1500,
                showConfirmButton: false
            });

            // এলার্ট শেষ হওয়ার পর নেভিগেট
            navigate("/dokkho/role");

        } catch (error) {
            console.error("OTP Verify Error:", error);
            Swal.fire({
                icon: "error",
                title: "ভুল ওটিপি!",
                text: "আপনার দেওয়া কোডটি সঠিক নয়। আবার চেষ্টা করুন।",
                confirmButtonColor: "#fb7185",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white px-6">
            <div className="w-full max-w-[450px] text-center">

                <h2 className="text-[26px] font-bold text-[#1A1A1A] md:text-3xl">
                    ওটিপি যাচাই করুন
                </h2>

                <p className="mt-4 text-[15px] leading-relaxed text-gray-500">
                    আপনার নম্বরে পাঠানো ৬-সংখ্যার কোডটি লিখুন।
                </p>

                <form onSubmit={handleVerify} className="mt-12">
                    <div className="flex justify-center gap-2 sm:gap-3">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={value}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border border-gray-200 bg-white text-center text-xl font-semibold text-gray-800 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 focus:outline-none transition-all"
                            />
                        ))}
                    </div>

                    <div className="mt-12">
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full rounded-xl py-3.5 text-[15px] font-semibold transition-all duration-200 active:scale-95 shadow-sm
                        ${isProcessing
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white border border-rose-100 text-rose-500 hover:bg-rose-50 hover:border-rose-200 shadow-sm"
                                }`}
                        >
                            {isProcessing ? "যাচাই করা হচ্ছে..." : "ওটিপি যাচাই করুন"}
                        </button>
                    </div>

                    <div className="mt-10">
                        <button
                            type="button"
                            className="text-[15px] font-medium text-rose-300 hover:text-rose-400 transition-colors"
                        >
                            পুনরায় ওটিপি পাঠান
                            <span className="ml-1 text-rose-300">(60 সেকেন্ড)</span>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default VerifyOtp;