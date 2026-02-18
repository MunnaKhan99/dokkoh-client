import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

const Step3Contact = ({ providerData, setProviderData, onPrev, onNext }) => {
    const toggleContact = (type) => {
        setProviderData({
            ...providerData,
            contact: {
                ...providerData.contact,
                [type]: !providerData.contact[type],
            },
        });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-1">যোগাযোগের মাধ্যম</h2>
            <p className="text-slate-400 text-sm mb-6">
                গ্রাহকরা কীভাবে আপনার সাথে যোগাযোগ করবে?
            </p>

            {/* Phone Toggle */}
            <div
                onClick={() => toggleContact("phone")}
                className={`group border-2 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all mb-4 ${providerData.contact?.phone
                        ? "border-rose-500 bg-rose-50/30 ring-4 ring-rose-50"
                        : "border-slate-100 hover:border-slate-200 bg-white"
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${providerData.contact?.phone ? "bg-rose-500 shadow-md shadow-rose-200" : "bg-slate-100"
                            }`}
                    >
                        <FaPhoneAlt
                            className={`text-lg ${providerData.contact?.phone ? "text-white" : "text-slate-400"
                                }`}
                        />
                    </div>
                    <div>
                        <p className={`font-semibold ${providerData.contact?.phone ? "text-rose-700" : "text-slate-700"}`}>
                            সরাসরি ফোন কল
                        </p>
                        <p className="text-xs text-slate-400">গ্রাহক সরাসরি কল করতে পারবে</p>
                    </div>
                </div>
                {providerData.contact?.phone && (
                    <FiCheckCircle className="text-2xl text-rose-500 animate-in zoom-in duration-300" />
                )}
            </div>

            {/* WhatsApp Toggle */}
            <div
                onClick={() => toggleContact("whatsapp")}
                className={`group border-2 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all mb-8 ${providerData.contact?.whatsapp
                        ? "border-rose-500 bg-rose-50/30 ring-4 ring-rose-50"
                        : "border-slate-100 hover:border-slate-200 bg-white"
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${providerData.contact?.whatsapp ? "bg-rose-500 shadow-md shadow-rose-200" : "bg-slate-100"
                            }`}
                    >
                        <FaWhatsapp
                            className={`text-xl ${providerData.contact?.whatsapp ? "text-white" : "text-slate-400"
                                }`}
                        />
                    </div>
                    <div>
                        <p className={`font-semibold ${providerData.contact?.whatsapp ? "text-rose-700" : "text-slate-700"}`}>
                            ওয়াটসঅ্যাপ মেসেজ
                        </p>
                        <p className="text-xs text-slate-400">গ্রাহক WhatsApp এ মেসেজ করতে পারবে</p>
                    </div>
                </div>
                {providerData.contact?.whatsapp && (
                    <FiCheckCircle className="text-2xl text-rose-500 animate-in zoom-in duration-300" />
                )}
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
                    className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-100 active:scale-95"
                >
                    এগিয়ে যান
                </button>
            </div>
        </div>
    );
};

export default Step3Contact;