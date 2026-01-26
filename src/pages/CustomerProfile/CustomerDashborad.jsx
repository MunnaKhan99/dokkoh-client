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
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header: Primary Blue (#4169E1) এবং Rounded Bottom ডিজাইন */}
            <div className="bg-[#4169E1] pt-8 pb-20 px-6 md:px-12 text-white rounded-b-[40px] shadow-2xl relative overflow-hidden">
                {/* Background Decoration (Subtle) */}
                <div className="absolute top-[-50px] right-[-50px] h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                <div className="flex justify-between items-center max-w-7xl mx-auto relative z-10">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight md:text-4xl">দক্ষ</h1>
                        <p className="text-xs md:text-sm opacity-80 mt-1 font-medium">
                            আপনার বিশ্বস্ত স্থানীয় সেবা মাধ্যম
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Provider Mode Toggle: Supporting Orange (#FF9F4B) Accent */}
                        <Link
                            to="/dokkho/provider/dashboard"
                            className="relative p-[2px] overflow-hidden rounded-full inline-block group shadow-xl transition-transform active:scale-95"
                        >
                            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF9F4B_0%,#FFFFFF_50%,#FF9F4B_100%)]" />
                            <div className="relative px-4 py-2 bg-white rounded-full text-[10px] md:text-xs font-extrabold text-[#2C2B2B] uppercase tracking-wider">
                                প্রোভাইডার মোড
                            </div>
                        </Link>

                        <Link to="/dokkho/customer/profile" className="hover:text-[#FF9F4B] transition-colors">
                            <FaRegUserCircle size={32} />
                        </Link>
                    </div>
                </div>

                {/* Location Bar: Glassmorphism Style */}
                <div className="max-w-7xl mx-auto mt-10 relative z-10">
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 border border-white/20 shadow-inner">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <MdLocationOn size={24} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">বর্তমান অবস্থান</p>
                            <p className="text-sm md:text-base font-semibold truncate">{locationName || "অবস্থান লোড হচ্ছে..."}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-20">

                {/* Search Bar: Clean with Primary Blue Focus */}
                <div className="relative group">
                    <IoSearchOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-400 group-focus-within:text-[#4169E1] transition-colors" />
                    <input
                        type="text"
                        placeholder="প্রয়োজনীয় সেবাটি খুঁজুন..."
                        className="w-full pl-14 pr-6 py-5 rounded-2xl shadow-xl bg-white focus:ring-4 focus:ring-[#4169E1]/10 border-none outline-none text-[#2C2B2B] text-lg transition-all"
                    />
                </div>

                {/* Popular Services Section */}
                <div className="mt-12 mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-extrabold text-[#2C2B2B] border-l-8 border-[#008B9C] pl-4">
                            জনপ্রিয় সেবাসমূহ
                        </h2>
                        <button className="text-[#4169E1] font-bold text-sm hover:underline">সবগুলো দেখুন</button>
                    </div>

                    {/* Service Grid: Mobile 2 cols, Tablet 3, Desktop 4 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.key}
                                    onClick={() => navigate(`/dokkho/customer/services/${service.key}`)}
                                    className="group cursor-pointer bg-white rounded-[32px] p-6 flex flex-col items-center gap-5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                                >
                                    {/* Icon Container with Supporting Colors */}
                                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center text-3xl transition-transform group-hover:rotate-12 duration-300
                                        ${service.key === 'electrician' ? 'bg-[#FF9F4B]/10 text-[#FF9F4B]' :
                                            service.key === 'plumber' ? 'bg-[#008B9C]/10 text-[#008B9C]' :
                                                'bg-[#4169E1]/10 text-[#4169E1]'}`}
                                    >
                                        <Icon />
                                    </div>

                                    <div className="text-center">
                                        <span className="font-bold text-[#2C2B2B] text-base md:text-lg block group-hover:text-[#4169E1] transition-colors">
                                            {service.name}
                                        </span>
                                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mt-1 block">
                                            সেবা নিন এখনই
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Navigation for Mobile (Optional but recommended) */}
            
        </div>
    );
};

export default CustomerDashboard;