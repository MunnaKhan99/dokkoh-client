import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaPhoneAlt, FaChevronDown } from "react-icons/fa";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from "../../firebase.config";
import Swal from "sweetalert2";

const PhoneLogin = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!phoneNumber || phoneNumber.length < 10) {
            Swal.fire({
                icon: "warning",
                title: "ভুল নম্বর!",
                text: "দয়া করে সঠিক মোবাইল নম্বর প্রদান করুন।",
                confirmButtonColor: "#f43f5e",
            });
            return;
        }

        try {
            setLoading(true);

            // ✅ Setup reCAPTCHA once
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    "recaptcha-container",
                    {
                        size: "invisible",
                    }
                );
            }

            const appVerifier = window.recaptchaVerifier;
            const fullPhone = `+880${phoneNumber}`;

            // ✅ Send OTP
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                fullPhone,
                appVerifier
            );

            // ✅ Save globally for VerifyOtp page
            window.confirmationResult = confirmationResult;
            Swal.fire({
                icon: "success",
                title: "ওটিপি পাঠানো হয়েছে",
                text: "আপনার ফোনে যাচাইকরণ কোডটি চেক করুন।",
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                position: 'top-end'
            });
            // ✅ Navigate ONLY on success
            navigate("/dokkho/verify-otp");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "ওটিপি পাঠানো যায়নি",
                text: "আবার চেষ্টা করুন অথবা সাপোর্ট সেন্টারে কথা বলুন।",
                confirmButtonColor: "#f43f5e",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white md:bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[400px] bg-white md:p-8 md:shadow-lg md:rounded-3xl">

                {/* Header Section */}
                <div className="text-center mb-10 mt-10 md:mt-0">
                    <h2 className="text-[28px] font-bold text-[#1A1A1A] mb-3">
                        শুরু করা যাক!
                    </h2>
                    <p className="text-gray-500 text-[15px] leading-6 px-4">
                        আপনার ফোন নম্বর লিখুন। আমরা সেখানে একটি যাচাইকরণ কোড পাঠাব।
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSendOtp} className="space-y-6">

                    {/* Input Group */}
                    <div className="flex items-center gap-3">
                        {/* Country Code Selector */}
                        <div className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 py-3.5 w-[110px] bg-white cursor-pointer hover:border-gray-300 transition-colors">
                            <div className="flex items-center gap-2">
                                <span className="text-lg leading-none">🇧🇩</span>
                                <span className="text-gray-700 font-medium text-[15px]">+880</span>
                            </div>
                            <FaChevronDown className="text-xs text-gray-400" />
                        </div>

                        {/* Phone Number Input */}
                        <div className="flex-1">
                            <input
                                type="tel"
                                placeholder="ফোন নম্বর"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-gray-800 placeholder-gray-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-[15px]"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Continue Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-xl py-3.5 text-[15px] font-semibold transition-all duration-200 active:scale-95 shadow-sm
                        ${loading
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white border border-rose-100 text-rose-500 hover:bg-rose-50 hover:border-rose-200 shadow-sm"
                            }`}
                    >
                        {loading ? "অপেক্ষা করুন..." : "চালিয়ে যান"}
                    </button>
                </form>

                {/* Footer / Login Link */}
                <div className="mt-8 text-center">
                    <p className="text-[14px] font-medium text-rose-500 cursor-pointer hover:underline">
                        test number: 1234567890
                    </p>
                </div>

                {/* Optional: Testing Number Display (Styled Subtly) */}
                <div className="mt-8 text-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-xs text-gray-300">Test: 1234567890</p>
                </div>
            </div>

            {/* Firebase Recaptcha Container */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default PhoneLogin;
