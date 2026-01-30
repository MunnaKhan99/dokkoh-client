import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    FaArrowLeft,
    FaStar,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaPhoneAlt,
    FaWhatsapp,
    FaBriefcase,
    FaTools,
} from "react-icons/fa";

const ProviderDetails = () => {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://dokkoh-server.vercel.app/providers/${providerId}`)
            .then((res) => {
                setProvider(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [providerId]);

    const formatWhatsAppNumber = (number) => {
        if (!number) return "";
        return number.replace(/\D/g, ""); // removes EVERYTHING except digits
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                লোড হচ্ছে...
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                প্রোভাইডার পাওয়া যায়নি
            </div>
        );
    }

    const phoneNumber = provider.phoneNumber;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24">
            {/* ---------- Header: Primary Blue (#4169E1) ---------- */}
            <div className="bg-[#4169E1] pt-6 pb-16 px-6 text-white rounded-b-[32px] md:rounded-b-[48px] shadow-xl relative overflow-hidden">
                {/* Subtle Background Blur */}
                <div className="absolute top-[-10px] right-[-10px] h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>

                {/* Back Button & Title Row */}
                <div className="flex items-center justify-between relative z-10 mb-4 max-w-6xl mx-auto w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-all"
                    >
                        <FaArrowLeft size={16} />
                    </button>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">প্রোভাইডার প্রোফাইল</span>
                    <div className="w-9"></div> {/* Balancer for centering if needed */}
                </div>

                {/* Main Profile Info: Flex row on Tablet/Desktop, Center on Mobile */}
                <div className="flex flex-col items-center relative z-10 max-w-6xl mx-auto">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/40 flex items-center justify-center text-3xl font-black shadow-inner mb-3">
                        {provider.name?.charAt(0)}
                    </div>

                    <h1 className="text-xl md:text-2xl font-black tracking-tight text-center uppercase leading-tight">
                        {provider.name}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                        <p className="text-[11px] font-bold bg-white/10 px-3 py-0.5 rounded-full border border-white/10">
                            {provider.serviceName}
                        </p>

                        <div className="bg-[#FF9F4B] text-[#2C2B2B] px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-black shadow-md">
                            <FaStar size={10} /> {provider.rating || "0.0"}
                        </div>

                        <span className="text-[10px] font-bold opacity-70">
                            ({provider.ratingCount} রিভিউ)
                        </span>
                    </div>
                </div>
            </div>

            {/* ---------- Content Area: Overlapping Cards ---------- */}
            <div className="px-6 -mt-12 relative z-20 space-y-6">

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-xl bg-[#008B9C]/10 text-[#008B9C] flex items-center justify-center mb-2">
                            <FaMapMarkerAlt size={18} />
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">এলাকা</p>
                        <p className="font-bold text-[#2C2B2B] text-sm">
                            {provider.locationSub || provider.locationParent}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-xl bg-[#FF9F4B]/10 text-[#FF9F4B] flex items-center justify-center mb-2">
                            <FaBriefcase size={18} />
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">অভিজ্ঞতা</p>
                        <p className="font-bold text-[#2C2B2B] text-sm">
                            {provider.experience} বছর
                        </p>
                    </div>
                </div>

                {/* Availability: Supporting Teal (#008B9C) */}
                {provider.availability && (
                    <div className="bg-[#008B9C]/10 border border-[#008B9C]/20 rounded-3xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#008B9C] text-white flex items-center justify-center shadow-lg shadow-[#008B9C]/30">
                            <FaCheckCircle size={24} />
                        </div>
                        <div>
                            <p className="font-black text-[#008B9C] text-lg leading-tight">
                                অ্যাক্টিভ
                            </p>
                            <p className="text-xs text-[#008B9C]/80 font-bold">
                                সরাসরি কাজ শুরু করতে প্রস্তুত
                            </p>
                        </div>
                    </div>
                )}

                {/* Services Section */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
                    <h2 className="text-lg font-black text-[#2C2B2B] mb-4 flex items-center gap-2">
                        <FaTools className="text-[#4169E1]" /> প্রদত্ত সেবাসমূহ
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-5 py-2 bg-[#F8FAFC] text-[#4169E1] font-bold rounded-2xl border border-[#4169E1]/10 text-sm">
                            {provider.serviceName}
                        </span>
                        {/* যদি আরও সার্ভিস থাকে এখানে ম্যাপ করা যাবে */}
                    </div>
                </div>
            </div>

            {/* ---------- Bottom Actions: Fixed at bottom ---------- */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex gap-4 z-50">
                {/* Call Now: Primary Blue */}
                <a
                    href={`tel:${phoneNumber}`}
                    className="flex-[1.5] bg-[#4169E1] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black shadow-xl shadow-[#4169E1]/20 active:scale-95 transition-transform"
                >
                    <FaPhoneAlt /> কল করুন
                </a>

                {/* WhatsApp: Standard WhatsApp Green with shadow */}
                <a
                    href={`https://wa.me/${formatWhatsAppNumber(phoneNumber)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black shadow-xl shadow-[#25D366]/20 active:scale-95 transition-transform"
                >
                    <FaWhatsapp size={20} /> মেসেজ
                </a>
            </div>
        </div>
    );
};

export default ProviderDetails;
