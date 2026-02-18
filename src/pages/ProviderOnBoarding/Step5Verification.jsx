import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

const Step5Verification = ({
    providerData,
    setProviderData,
    onPrev,
    onComplete,
    uploadToCloudinary, // reuse your helper
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
                    [side]: url, // front | back
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
        <div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">
                ধাপ ৫: ডকুমেন্ট ও ভেরিফিকেশন
            </h2>
            <p className="text-slate-400 text-sm mb-4">
                আপনার NID কার্ডের সামনের এবং পেছনের ছবি আপলোড করুন
            </p>

            {/* Front */}
            <div className="mb-4">
                <div className="relative rounded-2xl border border-slate-200 overflow-hidden">
                    {frontUrl ? (
                        <img src={frontUrl} alt="NID Front" className="w-full h-40 object-cover" />
                    ) : (
                        <div className="h-40 flex items-center justify-center bg-slate-50 text-slate-400">
                            NID সামনের দিক
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => frontRef.current.click()}
                        className="absolute bottom-2 right-2 bg-emerald-600 text-white rounded-full p-2 shadow"
                    >
                        <FaCamera />
                    </button>
                    <input
                        ref={frontRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpload("front", e.target.files[0])}
                    />
                </div>
                {uploading.front && <p className="text-xs text-emerald-600 mt-1">আপলোড হচ্ছে...</p>}
            </div>

            {/* Back */}
            <div className="mb-6">
                <div className="relative rounded-2xl border border-slate-200 overflow-hidden">
                    {backUrl ? (
                        <img src={backUrl} alt="NID Back" className="w-full h-40 object-cover" />
                    ) : (
                        <div className="h-40 flex items-center justify-center bg-slate-50 text-slate-400">
                            NID পেছনের দিক
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => backRef.current.click()}
                        className="absolute bottom-2 right-2 bg-emerald-600 text-white rounded-full p-2 shadow"
                    >
                        <FaCamera />
                    </button>
                    <input
                        ref={backRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpload("back", e.target.files[0])}
                    />
                </div>
                {uploading.back && <p className="text-xs text-emerald-600 mt-1">আপলোড হচ্ছে...</p>}
            </div>

            {/* Consent */}
            <div className="mb-6 rounded-2xl border border-slate-200 p-4 bg-slate-50">
                <p className="font-semibold mb-2">আমার ছবি সঠিক আছে নিশ্চিত করুন:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                    <li>✔ ছবি পরিষ্কার, কাটা নয়, ঝাপসা না</li>
                    <li>✔ ছবিতে আপনি একমাত্র ব্যক্তি</li>
                    <li>✔ আপনার মুখ ঢেকে রাখা নেই</li>
                    <li>✔ ছবি ৩০ দিনের মধ্যে তোলা</li>
                </ul>
                <label className="mt-3 flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="accent-emerald-600"
                    />
                    আমি উপরোক্ত শর্তগুলো মেনে নিয়েছি
                </label>
            </div>

            {/* Nav */}
            <div className="flex gap-3">
                <button
                    onClick={onPrev}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                    পূর্ববর্তী
                </button>
                <button
                    disabled={!frontUrl || !backUrl || !consent}
                    onClick={onComplete}
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-100"
                >
                    সেটআপ সম্পন্ন করুন
                </button>
            </div>
        </div>
    );
};

export default Step5Verification;
