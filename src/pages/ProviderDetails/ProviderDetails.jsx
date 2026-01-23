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
} from "react-icons/fa";

const ProviderDetails = () => {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/providers/${providerId}`)
            .then((res) => {
                setProvider(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [providerId]);

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
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* ---------- Header ---------- */}
            <div className="bg-emerald-500 text-white p-6 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-4 top-4 text-xl"
                >
                    <FaArrowLeft />
                </button>

                <div className="flex items-center gap-4 mt-6">
                    <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-xl font-bold">
                        {provider.name?.charAt(0)}
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold">
                            {provider.name}
                        </h1>
                        <p className="text-sm opacity-90">
                            {provider.serviceName}
                        </p>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded flex items-center gap-1">
                                <FaStar /> {provider.rating || "0.0"}
                            </span>
                            <span>
                                ({provider.ratingCount} রিভিউ)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- Info Cards ---------- */}
            <div className="p-4 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                        <FaMapMarkerAlt /> এলাকা
                    </p>
                    <p className="font-medium">
                        {provider.location}
                    </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-xs text-gray-400 mb-1">
                        অভিজ্ঞতা
                    </p>
                    <p className="font-medium">
                        {provider.experience} বছর
                    </p>
                </div>
            </div>

            {/* ---------- Availability ---------- */}
            {provider.availability && (
                <div className="mx-4 bg-green-100 border border-green-300 rounded-xl p-4 flex items-center gap-2">
                    <FaCheckCircle className="text-green-600" />
                    <div>
                        <p className="font-medium text-green-700">
                            এখনই উপলব্ধ
                        </p>
                        <p className="text-xs text-green-600">
                            সঙ্গে সঙ্গে কাজ শুরু করতে পারবেন
                        </p>
                    </div>
                </div>
            )}

            {/* ---------- Services ---------- */}
            <div className="p-4">
                <h2 className="font-semibold mb-3">
                    প্রদত্ত সেবা
                </h2>
                <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1 border rounded-full text-sm">
                        {provider.serviceName}
                    </span>
                </div>
            </div>

            {/* ---------- Bottom Actions ---------- */}
            <div className="mt-auto p-4 bg-white flex gap-4 border-t">

                {/* Call Now */}
                <a
                    href={`tel:${phoneNumber}`}
                    className="flex-1 bg-emerald-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
                >
                    <FaPhoneAlt /> কল করুন
                </a>

                {/* WhatsApp */}
                <a
                    href={`https://wa.me/${phoneNumber.replace("+", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
                >
                    <FaWhatsapp /> হোয়াটসঅ্যাপ
                </a>
            </div>
        </div>
    );
};

export default ProviderDetails;
