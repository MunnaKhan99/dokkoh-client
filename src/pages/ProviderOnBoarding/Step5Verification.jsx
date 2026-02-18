import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

const Step5Verification = ({
    providerData,
    setProviderData,
    onPrev,
    onComplete,
    uploadToCloudinary,
}) => {
    const frontRef = useRef(null);
    const backRef = useRef(null);
    const [uploading, setUploading] = useState({ front: false, back: false });
    const [consent, setConsent] = useState(false);

    const handleUpload = async (side, file) => {
        if (!file) return;
        setUploading((p) => ({ ...p, [side]: true }));
        try {
            const url = await uploadToCloudinary(file);
            setProviderData((prev) => ({
                ...prev,
                kyc: {
                    ...prev.kyc,
                    [side]: url,
                },
            }));
        } catch (e) {
            alert("ডকুমেন্ট আপলোড ব্যর্থ হয়েছে");
            console.error(e);
        } finally {
            setUploading((p) => ({ ...p, [side]: false }));
        }
    };

    const frontUrl = providerData?.kyc?.front;
    const backUrl = providerData?.kyc?.back;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
                ধাপ ৫: ডকুমেন্ট ও ভেরিফিকেশন
            </h2>
            <p className="text-slate-400 text-sm mb-6">
                আপনার NID কার্ডের সামনের এবং পেছনের ছবি আপলোড করুন
            </p>

            {/* NID Front */}
            <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">এনআইডি (সামনের দিক)</label>
                <div className={`relative rounded-2xl border-2 border-dashed overflow-hidden transition-all ${frontUrl ? 'border-rose-200' : 'border-slate-200 bg-slate-50'}`}>
                    {frontUrl ? (
                        <img src={frontUrl} alt="NID Front" className="w-full h-44 object-cover" />
                    ) : (
                        <div className="h-44 flex flex-col items-center justify-center text-slate-400">
                            {uploading.front ? (
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
                            ) : (
                                <p className="text-sm">ছবি আপলোড করুন</p>
                            )}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => frontRef.current.click()}
                        className="absolute bottom-3 right-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl p-3 shadow-lg transition-transform active:scale-90"
                    >
                        <FaCamera className="text-lg" />
                    </button>
                    <input
                        ref={frontRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpload("front", e.target.files[0])}
                    />
                </div>
                {uploading.front && <p className="text-xs text-rose-500 mt-2 font-medium animate-pulse">আপলোড হচ্ছে, দয়া করে অপেক্ষা করুন...</p>}
            </div>

            {/* NID Back */}
            <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">এনআইডি (পেছনের দিক)</label>
                <div className={`relative rounded-2xl border-2 border-dashed overflow-hidden transition-all ${backUrl ? 'border-rose-200' : 'border-slate-200 bg-slate-50'}`}>
                    {backUrl ? (
                        <img src={backUrl} alt="NID Back" className="w-full h-44 object-cover" />
                    ) : (
                        <div className="h-44 flex flex-col items-center justify-center text-slate-400">
                            {uploading.back ? (
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
                            ) : (
                                <p className="text-sm">ছবি আপলোড করুন</p>
                            )}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => backRef.current.click()}
                        className="absolute bottom-3 right-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl p-3 shadow-lg transition-transform active:scale-90"
                    >
                        <FaCamera className="text-lg" />
                    </button>
                    <input
                        ref={backRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpload("back", e.target.files[0])}
                    />
                </div>
                {uploading.back && <p className="text-xs text-rose-500 mt-2 font-medium animate-pulse">আপলোড হচ্ছে, দয়া করে অপেক্ষা করুন...</p>}
            </div>

            {/* Consent Box */}
            <div className={`mb-8 rounded-2xl border transition-all p-4 ${consent ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200 bg-slate-50'}`}>
                <p className="font-bold text-slate-700 text-sm mb-3">নিশ্চিত করুন যে আপনার ছবিগুলো:</p>
                <ul className="text-[13px] text-slate-600 space-y-2">
                    <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-rose-400" /> পরিষ্কার এবং লেখা বোঝা যাচ্ছে
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-rose-400" /> কোনো অংশ কাটা পড়েনি বা ঝাপসা নয়
                    </li>
                </ul>
                <label className="mt-4 flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 checked:border-rose-500 checked:bg-rose-500 transition-all"
                        />
                        <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 ml-0.5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className={`text-sm font-medium transition-colors ${consent ? 'text-rose-700' : 'text-slate-500'}`}>
                        আমি তথ্যগুলো সঠিক বলে নিশ্চিত করছি
                    </span>
                </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={onPrev}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
                >
                    পেছনে
                </button>
                <button
                    disabled={!frontUrl || !backUrl || !consent || uploading.front || uploading.back}
                    onClick={onComplete}
                    className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-100 active:scale-95"
                >
                    সেটআপ সম্পন্ন করুন
                </button>
            </div>
        </div>
    );
};

export default Step5Verification;