import { SERVICES } from "./constants";
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const Step1Service = ({ providerData, setProviderData, onNext }) => {
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const handleImagePick = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setProviderData({ ...providerData, profileImage: url });
        } catch (err) {
            alert("ছবি আপলোড ব্যর্থ হয়েছে");
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-8">
                <p className="text-sm font-semibold text-slate-600 mb-3">প্রোফাইল ছবি</p>

                <div className="relative w-28 h-28 rounded-full overflow-hidden bg-slate-100 border">
                    {providerData.profileImage ? (
                        <img
                            src={providerData.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
                            ছবি নেই
                        </div>
                    )}

                    {/* Camera Button */}
                    <button
                        type="button"
                        onClick={() => fileRef.current.click()}
                        className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow hover:bg-emerald-700"
                    >
                        <FaCamera />
                    </button>

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImagePick}
                        className="hidden"
                    />
                </div>

                {uploading && (
                    <p className="text-xs text-emerald-600 mt-2">ছবি আপলোড হচ্ছে...</p>
                )}
            </div>

            {/* Name Input */}
            <label className="block text-sm font-semibold text-slate-600 mb-2">
                আপনার নাম
            </label>
            <input
                type="text"
                placeholder="আপনার পূর্ণ নাম লিখুন"
                value={providerData.name}
                onChange={(e) =>
                    setProviderData({ ...providerData, name: e.target.value })
                }
                className="w-full border border-slate-200 rounded-xl p-4 mb-8 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 text-slate-700"
            />

            {/* Service Selection */}
            <h2 className="text-xl font-bold text-slate-800 mb-1">
                আপনি কোন ধরনের সেবা দেন?
            </h2>
            <p className="text-slate-400 text-sm mb-5">
                আপনার প্রধান দক্ষতার ক্ষেত্রটি নির্বাচন করুন
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
                {SERVICES.map((item) => (
                    <div
                        key={item.id}
                        onClick={() =>
                            setProviderData({ ...providerData, service: item.id })
                        }
                        className={`group cursor-pointer border-2 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-200 hover:scale-[1.02] ${providerData.service === item.id
                            ? "border-emerald-500 bg-emerald-50/50 ring-4 ring-emerald-50"
                            : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
                            }`}
                    >
                        <item.icon
                            className={`text-3xl ${providerData.service === item.id
                                ? "text-emerald-500"
                                : "text-slate-300 group-hover:text-slate-400"
                                }`}
                        />
                        <span
                            className={`text-sm font-semibold ${providerData.service === item.id
                                ? "text-emerald-700"
                                : "text-slate-600"
                                }`}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <button
                disabled={!providerData.name || !providerData.service || uploading}
                onClick={onNext}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-100"
            >
                এগিয়ে যান
            </button>
        </div>
    );
};

export default Step1Service;
