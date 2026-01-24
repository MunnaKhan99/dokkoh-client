import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    FaBolt,
    FaWrench,
    FaPaintRoller,
    FaRegUserCircle,
} from "react-icons/fa";
import { IoSearchOutline, IoBookOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { dokkhoContext } from "../../Layout/RootLayout";
import axios from "axios";
const services = [
    {
        key: "electrician",
        name: "ইলেক্ট্রিশিয়ান",
        icon: FaBolt,
        bg: "bg-yellow-100",
        color: "text-yellow-500",
    },
    {
        key: "plumber",
        name: "প্লাম্বার",
        icon: FaWrench,
        bg: "bg-blue-100",
        color: "text-blue-500",
    },
    {
        key: "tutor",
        name: "হোম টিউটর",
        icon: IoBookOutline,
        bg: "bg-purple-100",
        color: "text-purple-500",
    },
    {
        key: "others",
        name: "অন্যান্য",
        icon: FaPaintRoller,
        bg: "bg-orange-100",
        color: "text-orange-500",
    },
];
const AREA_PARENT_MAP = {
    /* ===================== MIRPUR ===================== */
    "মিরপুর": "mirpur",
    "মিরপুর ১": "mirpur", "মিরপুর ২": "mirpur", "মিরপুর ৬": "mirpur", "মিরপুর ৭": "mirpur",
    "মিরপুর ১০": "mirpur", "মিরপুর ১১": "mirpur", "মিরপুর ১১.৫": "mirpur", "মিরপুর ১২": "mirpur",
    "মিরপুর ১৩": "mirpur", "মিরপুর ১৪": "mirpur",
    "পল্লবী": "mirpur", "রূপনগর": "mirpur", "কালশী": "mirpur",
    "কাজীপাড়া": "mirpur", "পশ্চিম কাজীপাড়া": "mirpur", "পূর্ব কাজীপাড়া": "mirpur",
    "শেওড়াপাড়া": "mirpur", "পশ্চিম শেওড়াপাড়া": "mirpur", "পূর্ব শেওড়াপাড়া": "mirpur",
    "সেনপাড়া পর্বতা": "mirpur", "মনিপুর": "mirpur", "ইব্রাহিমপুর": "mirpur",
    "টোলারবাগ": "mirpur", "পাইকপাড়া": "mirpur", "আহমেদ নগর": "mirpur",
    "মিরপুর ডিওএইচএস": "mirpur", "ডি.ও.এইচ.এস মিরপুর": "mirpur",
    "দারুস সালাম": "mirpur", "গাবতলী": "mirpur", "মাজার রোড": "mirpur",

    /* ===================== DHANMONDI ===================== */
    "ধানমন্ডি": "dhanmondi", "ধানমন্ডি আবাসিক এলাকা": "dhanmondi",
    "জিগাতলা": "dhanmondi", "শংকর": "dhanmondi", "রায়ের বাজার": "dhanmondi",
    "কলাবাগান": "dhanmondi", "সোবহানবাগ": "dhanmondi", "শুক্রাবাদ": "dhanmondi",
    "হাজারীবাগ": "dhanmondi", "ট্যানারি মোড়": "dhanmondi",
    "নিউ মার্কেট": "dhanmondi", "আজিমপুর": "dhanmondi", "লালমাটিয়া": "dhanmondi",
    "কাটাবন": "dhanmondi", "নীলক্ষেত": "dhanmondi",

    /* ===================== MOHAMMADPUR ===================== */
    "মোহাম্মদপুর": "mohammadpur", "বসিলা": "mohammadpur", "জহুরি মহল্লা": "mohammadpur",
    "জাফরাবাদ": "mohammadpur", "নূরজাহান রোড": "mohammadpur", "তাজমহল রোড": "mohammadpur",
    "চাঁদ উদ্যান": "mohammadpur", "নবোদয় হাউজিং": "mohammadpur", "শেকেরটেক": "mohammadpur",
    "আদাবর": "mohammadpur", "বায়তুল আমান": "mohammadpur", "আসাদ গেট": "mohammadpur",

    /* ===================== UTTARA ===================== */
    "উত্তরা": "uttara", "আজমপুর": "uttara", "আব্দুল্লাহপুর": "uttara",
    "উত্তরা সেক্টর ১": "uttara", "উত্তরা সেক্টর ২": "uttara", "উত্তরা সেক্টর ৩": "uttara",
    "উত্তরা সেক্টর ৪": "uttara", "উত্তরা সেক্টর ৫": "uttara", "উত্তরা সেক্টর ৬": "uttara",
    "উত্তরা সেক্টর ৭": "uttara", "উত্তরা সেক্টর ৮": "uttara", "উত্তরা সেক্টর ৯": "uttara",
    "উত্তরা সেক্টর ১০": "uttara", "উত্তরা সেক্টর ১১": "uttara", "উত্তরা সেক্টর ১২": "uttara",
    "উত্তরা সেক্টর ১৩": "uttara", "উত্তরা সেক্টর ১৪": "uttara", "উত্তরা সেক্টর ১৫": "uttara",
    "উত্তরা সেক্টর ১৬": "uttara", "উত্তরা সেক্টর ১৭": "uttara", "উত্তরা সেক্টর ১৮": "uttara",
    "দিয়াবাড়ি": "uttara", "তুরাগ": "uttara", "কামারপাড়া": "uttara",

    /* ===================== GULSHAN / BANANI / BARIDHARA ===================== */
    "গুলশান": "gulshan", "গুলশান ১": "gulshan", "গুলশান ২": "gulshan",
    "বনানী": "gulshan", "বনানী ডিওএইচএস": "gulshan", "কড়াইল": "gulshan",
    "বারিধারা": "gulshan", "বারিধারা ডিওএইচএস": "gulshan", "বারিধারা জে ব্লক": "gulshan",
    "নিকেতন": "gulshan", "মহাখালী": "gulshan", "মহাখালী ডিওএইচএস": "gulshan",
    "নিকুঞ্জ": "gulshan", "নিকুঞ্জ ১": "gulshan", "নিকুঞ্জ ২": "gulshan",
    "খাপড়া": "gulshan", "কুড়িল": "gulshan", "নর্দা": "gulshan",

    /* ===================== BASHUNDHARA / VATARA ===================== */
    "বসুন্ধরা": "bashundhara", "বসুন্ধরা আবাসিক এলাকা": "bashundhara",
    "ভাটারা": "bashundhara", "ছোলমাইদ": "bashundhara", "যমুনা ফিউচার পার্ক": "bashundhara",

    /* ===================== TEJGAON / FARMGATE ===================== */
    "तेজগাঁও": "tejgaon", "तेজগাঁও শিল্প এলাকা": "tejgaon", "নাকহালপাড়া": "tejgaon",
    "ফার্মগেট": "tejgaon", "কারওয়ান বাজার": "tejgaon", "রাজাবাজার": "tejgaon",
    "পশ্চিম রাজাবাজার": "tejgaon", "পূর্ব রাজাবাজার": "tejgaon",
    "পান্থপথ": "tejgaon", "ইন্দিরা রোড": "tejgaon", "মণিপুরিপাড়া": "tejgaon",

    /* ===================== RAMNA / SHAHBAG ===================== */
    "রমনা": "ramna", "শাহবাগ": "ramna", "পরীবাগ": "ramna",
    "বাংলা মোটর": "ramna", "কাকরাইল": "ramna", "সেগুনবাগিচা": "ramna",
    "শান্তিনগর": "ramna", "মালিবাগ": "ramna", "মালিবাগ মোড়": "ramna",
    "মগবাজার": "ramna", "বড় মগবাজার": "ramna", "সিদ্ধেশ্বরী": "ramna",
    "ইস্কাটন": "ramna", "হলুবাজার": "ramna",

    /* ===================== BADDA / RAMPURA ===================== */
    "বাড্ডা": "badda", "উত্তর বাড্ডা": "badda", "মধ্য বাড্ডা": "badda", "দক্ষিণ বাড্ডা": "badda",
    "মেরুল বাড্ডা": "badda", "সাতারকুল": "badda",
    "রামপুরা": "badda", "বনশ্রী": "badda", "পূর্ব রামপুরা": "badda", "টিভি সেন্টার": "badda",
    "আফতাবনগর": "badda", "উলন": "badda",

    /* ===================== KHILGAON / SABUJBAG ===================== */
    "খিলগাঁও": "khilgaon", "গোরান": "khilgaon", "দক্ষিণগাঁও": "khilgaon",
    "বাসাবো": "khilgaon", "সবুজবাগ": "khilgaon", "মুগদা": "khilgaon",
    "মাদারটেক": "khilgaon", "নন্দীপাড়া": "khilgaon",

    /* ===================== JATRABARI / DEMRA ===================== */
    "যাত্রাবাড়ী": "jatrabari", "সায়েদাবাদ": "jatrabari", "ধলপুর": "jatrabari",
    "ডেমরা": "jatrabari", "সারুলিয়া": "jatrabari", "কোনাপাড়া": "jatrabari",
    "দনিয়া": "jatrabari", "মাতুয়াইল": "jatrabari",

    /* ===================== OLD DHAKA ===================== */
    "লালবাগ": "olddhaka", "কোতোয়ালি": "olddhaka", "সূত্রাপুর": "olddhaka",
    "শাঁখারীবাজার": "olddhaka", "চকবাজার": "olddhaka", "আরমানিটোলা": "olddhaka",
    "ইসলামপুর": "olddhaka", "ওয়ারী": "olddhaka", "গেন্ডারিয়া": "olddhaka",
    "নারিন্দা": "olddhaka", "ধোলাইখাল": "olddhaka", "সদরঘাট": "olddhaka",
    "তাঁতীবাজার": "olddhaka", "বাবু বাজার": "olddhaka", "বংশাল": "olddhaka",

    /* ===================== KHILKHET ===================== */
    "খিলক্ষেত": "khilkhet", "নামাপাড়া": "khilkhet", "বরুয়া": "khilkhet",

    /* ===================== SAVAR / OUTER ===================== */
    "সাভার": "savar", "আশুলিয়া": "savar", "ধামসোনা": "savar", "হেমায়েতপুর": "savar",
    "নবীনগর": "savar", "জিরাবো": "savar",
};

const CustomerDashboard = () => {
    const { setCustomerParentArea } = useContext(dokkhoContext);
    const navigate = useNavigate();
    const [locationName, setLocationName] = useState("লোকেশন নেওয়া হচ্ছে...");

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;
                    const res = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=bn`
                    );

                    const address = res.data?.address;
                    const sub =
                        address?.suburb ||
                        address?.quarter ||
                        address?.neighbourhood ||
                        address?.city_district;

                    const parent = AREA_PARENT_MAP[sub];

                    setLocationName(sub || "আপনার এলাকা");
                    setCustomerParentArea(parent || null);
                } catch {
                    setCustomerParentArea(null);
                }
            },
            () => setCustomerParentArea(null)
        );
    }, []);


    return (
        <div className="min-h-screen bg-[#F1F5F9]">
            {/* Header */}
            <div className="bg-[#2563EB] pt-6 pb-12 px-8 text-white">
                <div className="flex justify-between max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold">দক্ষ</h1>
                        <p className="text-sm opacity-90">
                            আপনার বিশ্বস্ত স্থানীয় সেবা মাধ্যম
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/dokkho/provider/dashboard"
                            className="relative p-[1.5px] overflow-hidden rounded-full inline-block group shadow-lg"
                        >
                            {/* Animated Shimmer Border - Gold/White Glow */}
                            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F59E0B_0%,#FFF_50%,#F59E0B_100%)]" />

                            {/* Inner Button Content */}
                            <div className="relative px-4 py-1.5  rounded-full text-[10px] md:text-xs font-bold text-black flex items-center gap-2 transition-all duration-300">
                                প্রোভাইডার মোড
                            </div>
                        </Link>
                        <Link to="/dokkho/customer/profile">
                            <FaRegUserCircle size={28} />
                        </Link>
                    </div>
                </div>

                {/* Location */}
                <div className="max-w-7xl mx-auto mt-8">
                    <div className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                        <MdLocationOn size={22} />
                        <div>
                            <p className="text-xs font-bold">বর্তমান অবস্থান</p>
                            <p className="text-sm">{locationName}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-8 -mt-6">
                {/* Search */}
                <div className="relative shadow-sm">
                    <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                    <input
                        type="text"
                        placeholder="প্রয়োজনীয় সেবাটি খুঁজুন..."
                        className="w-full pl-12 py-4 rounded-xl shadow-lg focus:ring-2 bg-white focus:ring-emerald-500 outline-none"
                    />
                </div>

                {/* Popular Services */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold border-l-4 border-[#0FA958] pl-3 mb-6">
                        জনপ্রিয় সেবাসমূহ
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.key}
                                    onClick={() =>
                                        navigate(`/dokkho/customer/services/${service.key}`)
                                    }
                                    className="cursor-pointer bg-white rounded-2xl p-6 lg:p-8 flex flex-col items-center gap-4 shadow hover:shadow-md transition border border-gray-50"
                                >
                                    <div
                                        className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full ${service.bg} flex items-center justify-center text-2xl ${service.color}`}
                                    >
                                        <Icon />
                                    </div>
                                    <span className="font-bold text-gray-700 text-sm lg:text-base text-center">
                                        {service.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;