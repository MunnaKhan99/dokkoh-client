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
        <div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">
                আপনার অভিজ্ঞতা, পারিশ্রমিক ও সময়সূচী যোগ করুন
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
                        className="w-1/2 border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none"
                    />
                    <select
                        value="বছর"
                        disabled
                        className="w-1/2 border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-500"
                    >
                        <option>বছর</option>
                    </select>
                </div>
            </div>

            {/* Pricing */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                    সার্ভিস প্রতি মূল্য
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
                        className="w-1/2 border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none"
                    />
                    <select
                        value={pricing.unit}
                        onChange={(e) =>
                            setProviderData((prev) => ({
                                ...prev,
                                pricing: { ...prev.pricing, unit: e.target.value },
                            }))
                        }
                        className="w-1/2 border border-slate-200 rounded-xl p-3"
                    >
                        <option value="hour">ঘন্টা প্রতি</option>
                        <option value="job">প্রজেক্ট প্রতি</option>
                    </select>
                </div>
            </div>

            {/* Weekly Availability */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                    সাপ্তাহিক টাইমিং
                </label>
                <div className="space-y-2">
                    {DAYS.map((day) => (
                        <select
                            key={day.key}
                            value={availability[day.key] || ""}
                            onChange={(e) => toggleDay(day.key, e.target.value)}
                            className="w-full border border-slate-200 rounded-xl p-3"
                        >
                            <option value="">{day.label}</option>
                            <option value="available">উপলব্ধ</option>
                            <option value="unavailable">অনুপলব্ধ</option>
                        </select>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
                <button
                    onClick={onPrev}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                    পূর্ববর্তী
                </button>
                <button
                    onClick={onNext}
                    disabled={!providerData.experience || !providerData.pricing?.amount}
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-100"
                >
                    পরবর্তী
                </button>
            </div>
        </div>
    );
};

export default Step4Pricing;
