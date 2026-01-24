import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaPhoneAlt, FaChevronDown } from "react-icons/fa";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from "../../firebase.config";

const PhoneLogin = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!phoneNumber || phoneNumber.length < 10) {
            alert("সঠিক মোবাইল নম্বর দিন");
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

            // ✅ Navigate ONLY on success
            navigate("/dokkho/verify-otp");
        } catch (error) {
            console.error("OTP Send Error:", error);
            alert(error.message || "OTP পাঠানো যায়নি");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6">
            <div className="w-full max-w-md text-center">
                {/* Icon */}
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#2563EB]">
                    <FaPhoneAlt size={35} className="text-white -rotate-12" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                    দক্ষ-তে স্বাগতম
                </h2>
                <p className="mt-2 text-gray-500">
                    এগিয়ে যেতে আপনার মোবাইল নম্বরটি লিখুন
                </p>

                {/* Form */}
                <form onSubmit={handleSendOtp} className="mt-10">
                    <div className="flex gap-3">
                        {/* Country code */}
                        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-3 shadow-sm">
                            <span className="text-gray-700 font-medium">BD</span>
                            <span className="text-gray-900 font-semibold">+880</span>
                            <FaChevronDown size={12} className="text-gray-400" />
                        </div>

                        {/* Phone input */}
                        <input
                            type="tel"
                            placeholder="1712345678"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-lg tracking-widest outline-none focus:border-[#0FA958] transition-colors shadow-sm"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        আপনার নম্বরটি যাচাই করতে আমরা একটি ওটিপি (OTP) পাঠাব
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full rounded-xl bg-[#82E0C1] py-4 text-lg font-bold text-white transition-all hover:bg-[#2563EB] disabled:opacity-60"
                    >
                        {loading ? "পাঠানো হচ্ছে..." : "ওটিপি (OTP) পাঠান"}
                    </button>
                </form>
            </div>

            {/* ✅ Required for Firebase */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default PhoneLogin;
