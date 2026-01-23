import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { dokkhoContext } from "../../Layout/RootLayout";
import { FaArrowLeft, FaStar, FaPhoneAlt } from "react-icons/fa";

const ServiceList = () => {
    const { serviceKey } = useParams();
    const navigate = useNavigate();
    const {
        providers,
        providersLoading,
        fetchProviders,
    } = useContext(dokkhoContext);

    useEffect(() => {
        fetchProviders({ serviceKey });
    }, [serviceKey]);

    const goToUserDetails = ( id ) => {
        navigate(`/dokkho/provider/${id}`);
    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* ---------- Header ---------- */}
            <div className="bg-[#0FA958] p-6 text-white">
                <button onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>

                <h1 className="text-xl font-bold mt-2">
                    {
                        providers.map(provider => (<p key={provider._id}>আপনার কাছাকাছি {provider.serviceName}</p>))
                    }
                </h1>

                <p className="text-sm opacity-90">
                    মোট {providers.length} জন প্রোভাইডার পাওয়া গেছে
                </p>
            </div>

            {/* ---------- Body ---------- */}
            <div className="p-6 space-y-4" >
                {providersLoading && (
                    <p className="text-center text-gray-500">
                        প্রোভাইডার লোড হচ্ছে...
                    </p>
                )}

                {!providersLoading && providers.length === 0 && (
                    <p className="text-center text-gray-500">
                        এই সেবার জন্য কোনো প্রোভাইডার পাওয়া যায়নি
                    </p>
                )}

                {!providersLoading &&
                    providers.map((provider) => (
                        <div
                            key={provider._id}
                            onClick={() => goToUserDetails(provider._id)}
                            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold">
                                    {provider.name || "নাম পাওয়া যায়নি"}
                                </h3>

                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <FaStar className="text-yellow-400" />
                                    {provider.rating}
                                    <span className="text-xs">
                                        ({provider.ratingCount} টি রিভিউ)
                                    </span>
                                </div>

                                <p className="text-sm text-gray-400">
                                    এলাকা: {provider.location || "উল্লেখ নেই"}
                                </p>
                            </div>

                            <a
                                href={`tel:${provider.contact?.phone}`}
                                className="bg-emerald-500 p-3 rounded-full text-white"
                                title="ফোন করুন"
                            >
                                <FaPhoneAlt />
                            </a>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ServiceList;
