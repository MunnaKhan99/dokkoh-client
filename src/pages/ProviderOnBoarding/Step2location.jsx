import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdLocationOn } from "react-icons/md";
import { PARENT_AREAS, AREA_PARENT_MAP } from "./constants";
import locationImage from "../../assets/locationImage.jpg";

const Step2Location = ({ providerData, setProviderData, onNext, onPrev }) => {
    const [locating, setLocating] = useState(false); // লোকেশন প্রসেসিং স্টেট

    const handleAutoLocation = () => {
        if (!navigator.geolocation) {
            return Swal.fire({
                icon: "error",
                title: "ব্যর্থ!",
                text: "আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।",
                confirmButtonColor: "#f43f5e",
            });
        }

        setLocating(true); // প্রসেসিং শুরু

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;
                    const res = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=bn`,
                        { withCredentials: false }
                    );

                    const adr = res.data.address;
                    // এলাকা সনাক্ত করার চেষ্টা
                    const detectedSub = adr.suburb || adr.quarter || adr.neighbourhood || adr.city_district || adr.town;
                    const parentArea = AREA_PARENT_MAP[detectedSub];

                    if (parentArea) {
                        setProviderData({
                            ...providerData,
                            locationParent: parentArea,
                            locationSub: detectedSub,
                        });
                        Swal.fire({
                            icon: "success",
                            title: "লোকেশন সনাক্ত হয়েছে",
                            text: `${detectedSub} (${parentArea})`,
                            confirmButtonColor: "#f43f5e",
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "এলাকা পাওয়া যায়নি",
                            text: "আপনার এলাকাটি আমাদের তালিকায় নেই। দয়া করে ম্যানুয়ালি নির্বাচন করুন।",
                            confirmButtonColor: "#f43f5e",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "দুঃখিত",
                        text: "লোকেশন খুঁজে পাওয়া যায়নি। দয়া করে ম্যানুয়ালি চেষ্টা করুন।",
                        confirmButtonColor: "#f43f5e",
                    });
                } finally {
                    setLocating(false); // প্রসেসিং শেষ
                }
            },
            (err) => {
                setLocating(false);
                Swal.fire({
                    icon: "error",
                    title: "পারমিশন এরর",
                    text: "দয়া করে লোকেশন পারমিশন এলাউ করুন।",
                    confirmButtonColor: "#f43f5e",
                });
            }
        );
    };

    return (
        <div className="animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
                আপনি সাধারণত কোথায় কাজ করেন?
            </h2>
            <p className="text-slate-400 text-sm mb-6">
                আপনার কাজের এলাকা নির্বাচন করুন
            </p>

            <div className="flex justify-center mb-6">
                <div className="w-full max-w-xs sm:max-w-sm ">
                    <img
                        src={locationImage}
                        alt="Location illustration"
                        className="mx-auto w-full h-48 object-contain rounded-2xl"
                    />
                </div>
            </div>

            {/* Auto Location Button with Loading State */}
            <button
                onClick={handleAutoLocation}
                disabled={locating}
                className={`w-full mb-6 py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all font-medium border ${locating
                        ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100"
                    }`}
            >
                {locating ? (
                    <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-rose-500 border-t-transparent"></div>
                        লোকেশন সনাক্ত করা হচ্ছে...
                    </>
                ) : (
                    <>
                        <MdLocationOn className="text-xl" />
                        বর্তমান লোকেশন ব্যবহার করুন
                    </>
                )}
            </button>

            {/* Area Dropdown */}
            <label className="block text-sm font-semibold text-slate-600 mb-2">
                ম্যানুয়ালি এলাকা নির্বাচন করুন
            </label>
            <select
                value={providerData.locationParent || ""}
                onChange={(e) =>
                    setProviderData({ ...providerData, locationParent: e.target.value })
                }
                className="w-full border border-slate-200 rounded-xl p-4 mb-8 focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none transition-all text-slate-700 bg-white"
            >
                <option value="">এরিয়া নির্বাচন করুন</option>
                {PARENT_AREAS.map((area) => (
                    <option key={area.key} value={area.key}>
                        {area.label}
                    </option>
                ))}
            </select>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={onPrev}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
                >
                    পেছনে
                </button>
                <button
                    onClick={onNext}
                    disabled={!providerData.locationParent || locating}
                    className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-100 active:scale-95"
                >
                    এগিয়ে যান
                </button>
            </div>
        </div>
    );
};

export default Step2Location;