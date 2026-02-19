import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    FaArrowLeft, FaStar, FaRegStar, FaMapMarkerAlt,
    FaPhoneAlt, FaWhatsapp, FaBriefcase, FaTools,
    FaTimes, FaPen
} from "react-icons/fa";
import { AuthContext } from "../../Layout/RootLayout";

const ProviderDetails = () => {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("");

    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/providers/${providerId}`)
            .then((res) => {
                setProvider(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [providerId]);

    useEffect(() => {
        if (!providerId) return;

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/reviews/provider/${providerId}?limit=3`)
            .then(res => setReviews(res.data))
            .catch(err => console.error(err));
    }, [providerId]);

    const formatWhatsAppNumber = (number) => {
        if (!number) return "";
        return number.replace(/\D/g, ""); // removes EVERYTHING except digits
    };

    const handleReviewSubmit = async () => {
        if (!user) {
            alert("রিভিউ দিতে প্রথমে লগইন করুন!");
            return;
        }

        if (userRating === 0) {
            alert("দয়া করে একটি রেটিং সিলেক্ট করুন");
            return;
        }

        const reviewData = {
            providerId,
            userId: user.uid,
            userName: user.phoneNumber || "Anonymous User",
            rating: userRating,
            comment: comment
        };

        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.post(
                `${baseUrl}/reviews`,
                reviewData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.success) {
                const oldCount = provider.ratingCount || 0;
                const oldRating = provider.rating || 0;
                const newCount = oldCount + 1;
                const newRating = ((oldRating * oldCount) + userRating) / newCount;

                setProvider({
                    ...provider,
                    rating: parseFloat(newRating.toFixed(1)),
                    ratingCount: newCount
                });

                setReviews(prev => [
                    {
                        _id: Date.now(),
                        userName: reviewData.userName,
                        rating: userRating,
                        comment,
                    },
                    ...prev.slice(0, 2),
                ]);

                setIsModalOpen(false);
                setUserRating(0);
                setComment("");
                alert("আপনার রিভিউটি সফলভাবে গ্রহণ করা হয়েছে!");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <p className="text-gray-500 font-bold">প্রোভাইডার তথ্য পাওয়া যায়নি</p>
            </div>
        );
    }

    const phoneNumber = provider.phoneNumber;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 font-sans">
            {/* --- Header --- */}
            <div className="bg-[#4169E1] pt-6 pb-12 px-6 text-white rounded-b-[40px] relative overflow-hidden">
                <div className="absolute top-[-20px] right-[-20px] h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                <div className="flex items-center justify-between relative z-10 mb-6 max-w-xl mx-auto">
                    <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl">
                        <FaArrowLeft size={16} />
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-[2px] opacity-70">প্রোভাইডার প্রোফাইল</span>
                    <div className="w-9"></div>
                </div>

                <div className="flex flex-col items-center relative z-10">
                    <div className="relative mb-3">
                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl font-black">
                            {provider.name?.charAt(0)}
                        </div>
                        {provider.availability && (
                            <div className="absolute -bottom-1 -right-1 flex h-5 w-5">
                                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative rounded-full h-5 w-5 bg-green-500 border-2 border-white"></span>
                            </div>
                        )}
                    </div>
                    <h1 className="text-xl font-black uppercase tracking-tight">{provider.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10">
                            {provider.serviceName}
                        </p>
                        <div className="bg-orange-400 text-white px-2 py-1 rounded-lg flex items-center gap-1 text-[11px] font-black">
                            <FaStar size={12} /> {provider.rating || "0.0"}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Content --- */}
            <div className="px-5 -mt-6 relative z-20 space-y-3 max-w-xl mx-auto w-full">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                            <FaMapMarkerAlt size={16} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] text-gray-400 font-black uppercase leading-none mb-1">এলাকা</p>
                            <p className="font-bold text-gray-800 text-[13px] truncate">{provider.locationSub || provider.locationParent}</p>
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                            <FaBriefcase size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] text-gray-400 font-black uppercase leading-none mb-1">অভিজ্ঞতা</p>
                            <p className="font-bold text-gray-800 text-[13px]">{provider.experience} বছর</p>
                        </div>
                    </div>
                </div>

                {/* Services Tags */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-[11px] font-black text-gray-400 uppercase mb-3 flex items-center gap-2">
                        <FaTools size={12} className="text-blue-600" /> প্রদত্ত সেবাসমূহ
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-slate-50 text-blue-600 font-bold rounded-xl border border-blue-50 text-[12px]">
                            {provider.serviceName}
                        </span>
                        <span className="px-3 py-1.5 bg-slate-50 text-gray-500 font-bold rounded-xl text-[12px]">দ্রুত সার্ভিস</span>
                        <span className="px-3 py-1.5 bg-slate-50 text-gray-500 font-bold rounded-xl text-[12px]">দক্ষ কর্মী</span>
                    </div>
                </div>

                {/* --- Latest Reviews --- */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[11px] font-black text-gray-400 uppercase">সাম্প্রতিক রিভিউ</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-blue-600 text-xs font-black flex items-center gap-1"
                        >
                            <FaPen size={10} /> রিভিউ দিন
                        </button>
                    </div>

                    {reviews.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-6">এখনো কোনো রিভিউ নেই</p>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review._id} className="border-b last:border-0 pb-4 last:pb-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-bold text-sm text-gray-800">{review.userName}</p>
                                        <div className="flex items-center gap-1 text-orange-400">
                                            <FaStar size={12} />
                                            <span className="text-xs font-bold">{review.rating}</span>
                                        </div>
                                    </div>
                                    {review.comment && <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- Review Modal --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-gray-800">আপনার মতামত জানান</h3>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-400">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="flex justify-center gap-3 mb-8">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => setUserRating(star)} className="focus:outline-none transition-transform active:scale-90">
                                    {star <= userRating ? (
                                        <FaStar size={36} className="text-orange-400" />
                                    ) : (
                                        <FaRegStar size={36} className="text-gray-200" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <textarea
                            rows="4"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-6 resize-none"
                            placeholder="প্রোভাইডারের কাজ কেমন ছিল? বিস্তারিত লিখুন..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <div className="flex gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl active:scale-95 transition-all">বাতিল</button>
                            <button
                                onClick={handleReviewSubmit}
                                disabled={userRating === 0}
                                className={`flex-[2] py-4 rounded-2xl font-black text-white shadow-lg transition-all active:scale-95 ${userRating === 0 ? 'bg-gray-300' : 'bg-[#4169E1] shadow-blue-200'}`}
                            >
                                সাবমিট করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Bottom Action Buttons --- */}
            <div className="fixed bottom-0 inset-x-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex gap-3 z-50">
                <a href={`tel:${phoneNumber}`} className="flex-[1.5] bg-[#4169E1] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black shadow-lg shadow-blue-100 active:scale-95 transition-transform">
                    <FaPhoneAlt size={14} /> কল করুন
                </a>
                <a href={`https://wa.me/${formatWhatsAppNumber(phoneNumber)}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black shadow-lg shadow-green-100 active:scale-95 transition-transform">
                    <FaWhatsapp size={18} /> মেসেজ
                </a>
            </div>
        </div>
    );
};

export default ProviderDetails;