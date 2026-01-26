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

                {/* Icon Container: Primary Blue ব্যবহার করা হয়েছে */}
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#4169E1] shadow-lg shadow-blue-200 transform -rotate-6">
                    <FaPhoneAlt size={35} className="text-white rotate-12" />
                </div>

                {/* Title: Neutral Dark (#2C2B2B) ব্যবহার করা হয়েছে */}
                <h2 className="text-3xl font-extrabold text-[#2C2B2B] md:text-4xl">
                    দক্ষ-তে <span className="text-[#4169E1]">স্বাগতম</span>
                </h2>
                <p className="mt-3 text-gray-500 font-medium">
                    এগিয়ে যেতে আপনার মোবাইল নম্বরটি লিখুন
                </p>

                {/* Form */}
                <form onSubmit={handleSendOtp} className="mt-10">
                    <div className="flex gap-3">
                        {/* Country code: Neutral Palette এর হালকা শেড */}
                        <div className="flex items-center gap-2 rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-4 shadow-sm">
                            <span className="text-gray-500 font-bold text-sm">BD</span>
                            <span className="text-[#2C2B2B] font-bold">+880</span>
                            <FaChevronDown size={12} className="text-gray-400" />
                        </div>

                        {/* Phone input: Focus করলে Primary Blue (#4169E1) হবে */}
                        <input
                            type="tel"
                            placeholder="1712345678"
                            className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-lg font-semibold tracking-[0.2em] outline-none focus:border-[#4169E1] focus:bg-white transition-all shadow-sm text-[#2C2B2B]"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Info Text: Supporting Teal (#008B9C) এর একটি হালকা ভাব রাখা হয়েছে */}
                    <p className="mt-6 text-sm text-gray-400">
                        আপনার নম্বরটি যাচাই করতে আমরা একটি <span className="text-[#008B9C] font-semibold">ওটিপি (OTP)</span> পাঠাব
                    </p>

                    {/* Submit Button: Primary Blue (#4169E1) এবং Hover-এ Teal (#008B9C) */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 w-full rounded-2xl bg-[#4169E1] py-4 text-lg font-bold text-white shadow-xl shadow-blue-200 transition-all hover:bg-[#008B9C] active:scale-95 disabled:opacity-60"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                পাঠানো হচ্ছে...
                            </span>
                        ) : (
                            "ওটিপি (OTP) পাঠান"
                        )}
                    </button>
                </form>

                {/* Footer Link: Supporting Orange (#FF9F4B) ব্যবহার করা যেতে পারে */}
                <p className="mt-10 text-sm text-gray-400">
                    সহায়তার প্রয়োজন? <span className="text-[#FF9F4B] font-bold cursor-pointer underline">যোগাযোগ করুন</span>
                </p>
            </div>

            {/* ✅ Required for Firebase */}
            <div id="recaptcha-container" className="mt-4"></div>
        </div>
    );
};

export default PhoneLogin;
