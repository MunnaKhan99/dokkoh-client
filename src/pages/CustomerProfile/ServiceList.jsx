import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaStar, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { CustomerContext } from "../../Layout/CustomerLayout";

const ServiceList = () => {
    const { serviceKey } = useParams();
    console.log(serviceKey);
    const navigate = useNavigate();
    const { providers, providersLoading, fetchProviders, customerParentArea } = useContext(CustomerContext)

    console.log(providers);
    console.log(customerParentArea);
    useEffect(() => {
        fetchProviders({
            serviceKey,
            locationParent: customerParentArea, // 👈 key line
        });
    }, [serviceKey, customerParentArea]);


    const goToUserDetails = (id) => {
        navigate(`/dokkho/provider/${id}`);
    }
    const serviceTitles = {
        electrician: "ইলেক্ট্রিশিয়ান",
        tutor: "টিউটর",
        plumber: "প্লাম্বার",
        others: "অন্যান্য প্রোভাইডার"
    };
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* ---------- Header: Primary Blue (#4169E1) ---------- */}
            <div className="bg-[#4169E1] pt-10 pb-20 px-6 md:px-16 text-white rounded-b-[40px] shadow-lg relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-30px] right-[-30px] h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90"
                    >
                        <FaArrowLeft size={20} />
                    </button>

                    <div className="mt-4">
                        <h1 className="text-2xl md:text-4xl font-black tracking-tight">
                            আপনার কাছাকাছি {serviceTitles[serviceKey] || "প্রোভাইডার"}
                        </h1>
                        <p className="text-xs md:text-sm opacity-80 font-bold uppercase tracking-widest mt-1">
                            মোট {providers.length} জন প্রোভাইডার পাওয়া গেছে
                        </p>
                    </div>
                </div>
            </div>

            {/* ---------- Body: List Section ---------- */}
            <div className="max-w-5xl mx-auto px-6 -mt-10 pb-12 relative z-20">

                {/* Loading State */}
                {providersLoading && (
                    <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4169E1] border-t-transparent"></div>
                        <p className="text-gray-500 font-bold">প্রোভাইডার খোঁজা হচ্ছে...</p>
                    </div>
                )}

                {/* Empty State */}
                {!providersLoading && providers.length === 0 && (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                        <p className="text-gray-400 text-lg font-medium">দুঃখিত, এই সেবার জন্য বর্তমানে কোনো প্রোভাইডার নেই।</p>
                    </div>
                )}

                {/* Providers Grid: Mobile 1 col, Tablet/Desktop 2 cols */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!providersLoading && providers.map((provider) => (
                        <div
                            key={provider._id}
                            onClick={() => goToUserDetails(provider._id)}
                            className="group bg-white p-5 rounded-[28px] shadow-xl shadow-blue-900/5 border border-gray-50 flex justify-between items-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                {/* Avatar with Initials */}
                                <div className="h-16 w-16 rounded-2xl bg-[#008B9C]/10 text-[#008B9C] flex items-center justify-center text-xl font-black">
                                    {provider.name?.slice(0, 1).toUpperCase()}
                                </div>

                                <div>
                                    <h3 className="font-black text-[#2C2B2B] text-lg group-hover:text-[#4169E1] transition-colors">
                                        {provider.name || "নাম পাওয়া যায়নি"}
                                    </h3>

                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
                                            <FaStar className="text-[#FF9F4B] text-xs" />
                                            <span className="text-xs font-black text-[#2C2B2B]">{provider.rating}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                            ({provider.ratingCount} রিভিউ)
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 mt-2 text-gray-400">
                                        <FaMapMarkerAlt size={12} className="text-[#008B9C]" />
                                        <p className="text-xs font-medium">
                                            {provider.locationSub || provider.locationParent || "লোকেশন নেই"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Call Button: Teal (#008B9C) */}
                            <a
                                href={`tel:${provider.contact?.phone}`}
                                onClick={(e) => e.stopPropagation()} // Card click বন্ধ করার জন্য
                                className="bg-[#008B9C] p-4 rounded-2xl text-white shadow-lg shadow-teal-100 hover:scale-110 active:scale-90 transition-all"
                                title="ফোন করুন"
                            >
                                <FaPhoneAlt size={18} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceList;
