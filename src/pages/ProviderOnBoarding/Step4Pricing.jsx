import React from "react";

const DAYS = [
    { key: "saturday", label: "শনিবার" },
    { key: "sunday", label: "রবিবার" },
    { key: "monday", label: "সোমবার" },
    { key: "tuesday", label: "মঙ্গলবার" },
    { key: "wednesday", label: "বুধবার" },
    { key: "thursday", label: "বৃহস্পতিবার" },
    { key: "friday", label: "শুক্রবার" },
];

const Step4Pricing = ({ providerData, setProviderData, onPrev, onNext }) => {
    const pricing = providerData.pricing || { amount: "", unit: "hour" };
    const experience = providerData.experience || "";
    const availability = providerData.availabilityDays || {};

    const toggleDay = (dayKey, value) => {
        setProviderData((prev) => ({
            ...prev,
            availabilityDays: {
                ...prev.availabilityDays,
                [dayKey]: value,
            },
        }));
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
                আপনার অভিজ্ঞতা ও শর্তাবলী
            </h2>
            <p className="text-slate-400 text-sm mb-6">
                গ্রাহকদের জন্য আপনার কাজের শর্তাবলী সেট করুন
            </p>

            {/* Experience */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                    অভিজ্ঞতা
                </label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        min="0"
                        placeholder="সংখ্যা"
                        value={experience}
                        onChange={(e) =>
                            setProviderData((prev) => ({
                                ...prev,
                                experience: e.target.value,
                            }))
                        }
                        className="w-1/2 border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none transition-all"
                    />
                    <div className="w-1/2 border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-500 flex items-center justify-center font-medium">
                        বছর
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                    সার্ভিস প্রতি মূল্য (টাকা)
                </label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        min="0"
                        placeholder="মূল্য"
                        value={pricing.amount}
                        onChange={(e) =>
                            setProviderData((prev) => ({
                                ...prev,
                                pricing: { ...prev.pricing, amount: e.target.value },
                            }))
                        }
                        className="w-1/2 border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none transition-all"
                    />
                    <select
                        value={pricing.unit}
                        onChange={(e) =>
                            setProviderData((prev) => ({
                                ...prev,
                                pricing: { ...prev.pricing, unit: e.target.value },
                            }))
                        }
                        className="w-1/2 border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none bg-white transition-all text-slate-700"
                    >
                        <option value="hour">ঘণ্টা প্রতি</option>
                        <option value="job">প্রজেক্ট প্রতি</option>
                    </select>
                </div>
            </div>

            {/* Weekly Availability */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                    সাপ্তাহিক টাইমিং
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {DAYS.map((day) => (
                        <select
                            key={day.key}
                            value={availability[day.key] || ""}
                            onChange={(e) => toggleDay(day.key, e.target.value)}
                            className={`w-full border rounded-xl p-3 transition-all outline-none ${availability[day.key] === "available"
                                    ? "border-rose-200 bg-rose-50/50 text-rose-700"
                                    : "border-slate-100 bg-white text-slate-600"
                                }`}
                        >
                            <option value="">{day.label}</option>
                            <option value="available">উপলব্ধ (Available)</option>
                            <option value="unavailable">অনুপলব্ধ (Off)</option>
                        </select>
                    ))}
                </div>
            </div>

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
                    disabled={!experience || !pricing.amount}
                    className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-100 active:scale-95"
                >
                    এগিয়ে যান
                </button>
            </div>
        </div>
    );
};

export default Step4Pricing;