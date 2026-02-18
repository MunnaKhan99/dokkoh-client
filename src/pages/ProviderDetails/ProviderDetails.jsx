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
        axios.get(`http://localhost:3000/providers/${providerId}`)
            .then((res) => {
                setProvider(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [providerId]);

    useEffect(() => {
        if (!providerId) return;
        axios.get(`http://localhost:3000/reviews/provider/${providerId}?limit=3`)
            .then(res => setReviews(res.data))
            .catch(() => { });
    }, [providerId]);

    const formatWhatsAppNumber = (number) => number?.replace(/\D/g, "");

    const handleReviewSubmit = async () => {
        if (!user) return alert("রিভিউ দিতে প্রথমে লগইন করুন!");
        if (userRating === 0) return alert("রেটিং সিলেক্ট করুন");

        try {
            const res = await axios.post(
                "http://localhost:3000/reviews",
                { providerId, rating: userRating, comment },
                { withCredentials: true }
            );

            if (res.data.success) {
                setReviews(prev => [
                    {
                        _id: Date.now(),
                        userName: user.phoneNumber || "User",
                        rating: userRating,
                        comment,
                    },
                    ...prev.slice(0, 2),
                ]);
                setIsModalOpen(false);
                setUserRating(0);
                setComment("");
            }
        } catch {
            alert("রিভিউ সাবমিট ব্যর্থ হয়েছে");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">লোড হচ্ছে...</div>;
    if (!provider) return <div className="min-h-screen flex items-center justify-center text-gray-400">প্রোভাইডার পাওয়া যায়নি</div>;

    return (
        <div className="min-h-screen bg-[#F6F9FC] pb-28">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-sm font-semibold text-gray-800">প্রোভাইডারের বিবরণ</h1>
                </div>
            </div>

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto px-4 pt-6">
                <div className="bg-white rounded-2xl p-5 border shadow-sm text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border mb-3">
                        {provider.profileImage ? (
                            <img src={provider.profileImage} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-gray-100">
                                {provider.name?.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h2 className="font-bold text-lg">{provider.name}</h2>
                    <p className="text-sm text-gray-500">{provider.serviceName}</p>

                    <div className="flex justify-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <FaStar key={i} className={i <= Math.round(provider.rating) ? "text-orange-400" : "text-gray-300"} />
                        ))}
                        <span className="ml-1 text-sm font-semibold text-gray-700">{provider.rating || "0.0"}</span>
                    </div>
                </div>
            </div>

            {/* Info Sections */}
            <div className="max-w-4xl mx-auto px-4 mt-4 space-y-3">
                <div className="bg-white rounded-xl p-4 border">
                    <h3 className="font-semibold text-sm mb-1">অভিজ্ঞতা</h3>
                    <p className="text-sm text-gray-600">{provider.experience} বছর</p>
                </div>

                <div className="bg-white rounded-xl p-4 border">
                    <h3 className="font-semibold text-sm mb-1">এলাকা</h3>
                    <p className="text-sm text-gray-600">
                        {provider.locationSub || provider.locationParent}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-4 border">
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <FaTools className="text-blue-600" /> প্রদত্ত সেবাসমূহ
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                            {provider.serviceName}
                        </span>
                    </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-xl p-4 border">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm">সাম্প্রতিক রিভিউ</h3>
                        <button onClick={() => setIsModalOpen(true)} className="text-blue-600 text-xs font-semibold">
                            রিভিউ দিন
                        </button>
                    </div>

                    {reviews.length === 0 ? (
                        <p className="text-sm text-gray-400">এখনো কোনো রিভিউ নেই</p>
                    ) : (
                        <div className="space-y-3">
                            {reviews.map(r => (
                                <div key={r._id} className="border-b last:border-0 pb-2 last:pb-0">
                                    <div className="flex items-center justify-between text-sm font-semibold">
                                        <span>{r.userName}</span>
                                        <span className="flex items-center gap-1 text-orange-400">
                                            <FaStar /> {r.rating}
                                        </span>
                                    </div>
                                    {r.comment && <p className="text-sm text-gray-600 mt-1">{r.comment}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">রিভিউ দিন</h3>
                            <button onClick={() => setIsModalOpen(false)}><FaTimes /></button>
                        </div>

                        <div className="flex justify-center gap-3 mb-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} onClick={() => setUserRating(star)}>
                                    {star <= userRating ? (
                                        <FaStar className="text-orange-400 text-2xl" />
                                    ) : (
                                        <FaRegStar className="text-gray-300 text-2xl" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <textarea
                            rows="4"
                            className="w-full border rounded-xl p-3 text-sm mb-4"
                            placeholder="আপনার অভিজ্ঞতা লিখুন..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            onClick={handleReviewSubmit}
                            className="w-full bg-[#4169E1] text-white py-3 rounded-xl font-semibold"
                        >
                            সাবমিট করুন
                        </button>
                    </div>
                </div>
            )}

            {/* Bottom CTA */}
            <div className="fixed bottom-0 inset-x-0 bg-white border-t p-4 flex gap-3">
                <a
                    href={`tel:${provider.phoneNumber}`}
                    className="flex-1 bg-[#4169E1] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
                >
                    <FaPhoneAlt /> কল করুন
                </a>
                <a
                    href={`https://wa.me/${formatWhatsAppNumber(provider.phoneNumber)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-[#25D366] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
                >
                    <FaWhatsapp /> মেসেজ
                </a>
            </div>
        </div>
    );
};

export default ProviderDetails;
