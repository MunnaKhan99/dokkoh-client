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
        <div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">যোগাযোগের মাধ্যম</h2>
            <p className="text-slate-400 text-sm mb-6">
                গ্রাহকরা কীভাবে আপনার সাথে যোগাযোগ করবে?
            </p>

            {/* Phone Toggle */}
            <div
                onClick={() => toggleContact("phone")}
                className={`group border-2 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all mb-4 ${providerData.contact?.phone
                        ? "border-emerald-500 bg-emerald-50/30 ring-4 ring-emerald-50"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${providerData.contact?.phone ? "bg-emerald-500" : "bg-slate-100"
                            }`}
                    >
                        <FaPhoneAlt
                            className={`text-lg ${providerData.contact?.phone ? "text-white" : "text-slate-400"
                                }`}
                        />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-700">সরাসরি ফোন কল</p>
                        <p className="text-xs text-slate-400">গ্রাহক সরাসরি কল করতে পারবে</p>
                    </div>
                </div>
                {providerData.contact?.phone && (
                    <FiCheckCircle className="text-2xl text-emerald-500" />
                )}
            </div>

            {/* WhatsApp Toggle */}
            <div
                onClick={() => toggleContact("whatsapp")}
                className={`group border-2 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all mb-8 ${providerData.contact?.whatsapp
                        ? "border-emerald-500 bg-emerald-50/30 ring-4 ring-emerald-50"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${providerData.contact?.whatsapp ? "bg-emerald-500" : "bg-slate-100"
                            }`}
                    >
                        <FaWhatsapp
                            className={`text-xl ${providerData.contact?.whatsapp ? "text-white" : "text-slate-400"
                                }`}
                        />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-700">ওয়াটসঅ্যাপ মেসেজ</p>
                        <p className="text-xs text-slate-400">গ্রাহক WhatsApp এ মেসেজ করতে পারবে</p>
                    </div>
                </div>
                {providerData.contact?.whatsapp && (
                    <FiCheckCircle className="text-2xl text-emerald-500" />
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={onPrev}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                    পেছনে
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-100"
                >
                    সেটআপ সম্পন্ন করুন
                </button>
            </div>
        </div>
    );
};

export default Step3Contact;