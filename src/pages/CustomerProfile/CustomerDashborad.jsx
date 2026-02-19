import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    FaBolt,
    FaWrench,
    FaPaintRoller,
    FaRegUserCircle,
    FaStar,
} from "react-icons/fa";
import { IoSearchOutline, IoBookOutline, IoGridOutline, IoNotificationsOutline } from "react-icons/io5";
import { MdLocationOn, MdBuild } from "react-icons/md";
import axios from "axios";
import { CustomerContext } from "../../Layout/CustomerLayout";
import { MdArrowForwardIos } from "react-icons/md";

// সার্ভিস ক্যাটাগরি ডাটা
const services = [
    { key: "electrician", name: "ইলেক্ট্রিশিয়ান", icon: FaBolt, color: "text-blue-400" },
    { key: "plumber", name: "প্লাম্বার", icon: FaWrench, color: "text-gray-500" },
    { key: "tutor", name: "হোম টিউটর", icon: IoBookOutline, color: "text-purple-400" },
    { key: "painting", name: "পেন্টিং", icon: FaPaintRoller, color: "text-orange-400" },
    { key: "cleaning", name: "ক্লিনিং", icon: IoGridOutline, color: "text-green-400" },
];

// মক ডাটা (আপনার দেওয়া MongoDB স্কিমা অনুযায়ী ৩ জন প্রোভাইডার)
const nearbyProviders = [
    {
        id: "1",
        name: "আরিফ হোসেন",
        serviceName: "ইলেক্ট্রিশিয়ান",
        rating: 4.9,
        distance: "২ কি.মি.",
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: "2",
        name: "শারমিন আক্তার",
        serviceName: "প্লাম্বার",
        rating: 4.7,
        distance: "১.৫ কি.মি.",
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        id: "3",
        name: "নজরুল ইসলাম",
        serviceName: "ক্লিনিং সার্ভিস",
        rating: 4.8,
        distance: "৩ কি.মি.",
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
    }
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
    const navigate = useNavigate();
    const { setCustomerParentArea, customerParentArea } = useContext(CustomerContext);
    const [nearbyLoading, setNearbyLoading] = useState(false);

    const [locationName, setLocationName] = useState("লোকেশন নেওয়া হচ্ছে...");
    // const [searchQuery, setSearchQuery] = useState("");
    const [nearbyProviders, setNearbyProviders] = useState([]);
    const carouselRef = useRef(null);

    // লোকেশন ডিটেকশন ফাংশনালিটি
    useEffect(() => {

        if (!navigator.geolocation) return;



        navigator.geolocation.getCurrentPosition(

            async (pos) => {

                try {

                    const { latitude, longitude } = pos.coords;

                    const res = await axios.get(

                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=bn`, {

                        withCredentials: false

                    });



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

    useEffect(() => {
        const fetchNearbyProviders = async () => {
            try {
                setNearbyLoading(true);

                const response = await axios.get(
                    `https://dokkohserver.vercel.app/providers/nearby?locationParent=${customerParentArea}`,
                    { withCredentials: true }
                );

                console.log("Nearby Providers:", response.data); // ডিবাগ
                setNearbyProviders(response.data);
            } catch (error) {
                console.error("Failed to fetch providers:", error);
            } finally {
                setNearbyLoading(false);
            }
        };

        if (customerParentArea) {
            fetchNearbyProviders();
        }
    }, [customerParentArea]);

    const scrollCarousel = (dir) => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({ left: dir === "left" ? -100 : 100, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] pb-20 md:pb-10">
            {/* --- RESPONSIVE HEADER --- */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo Area */}
                        <div className="flex items-center gap-3">
                            <div className="bg-[#008080] p-2 rounded-xl text-white shadow-lg">
                                <MdBuild size={22} />
                            </div>
                            <span className="text-xl font-bold text-gray-800 hidden sm:block">দক্ষ</span>
                        </div>

                        {/* Desktop Search (Center) */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="সার্ভিস বা প্রোভাইডার খুঁজুন..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#008080]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 md:gap-5">
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">বর্তমান অবস্থান</p>
                                <div className="flex items-center text-xs font-semibold text-gray-700">
                                    <MdLocationOn className="text-red-500" /> {locationName}
                                </div>
                            </div>
                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
                                <IoNotificationsOutline size={24} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div
                                className="flex items-center gap-2 cursor-pointer p-1 pr-3 hover:bg-gray-100 rounded-full transition-all"
                                onClick={() => navigate('/dokkho/customer/profile')}
                            >
                                <FaRegUserCircle size={30} className="text-gray-600" />
                                <span className="hidden lg:block text-sm font-bold text-gray-700">আমার প্রোফাইল</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                {/* Mobile Search Bar (Only visible on Mobile) */}
                <div className="md:hidden mb-8">
                    <div className="relative">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="সার্ভিস খুঁজুন..."
                            className="w-full bg-white border border-purple-100 rounded-2xl py-4 pl-12 pr-4 shadow-sm outline-none"
                        />
                    </div>
                </div>

                {/* --- SERVICE CATEGORIES --- */}
                <section className="mb-12">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-gray-800">সার্ভিস ক্যাটাগরি</h2>
                            <p className="text-sm text-gray-500 mt-1">আপনার প্রয়োজনীয় সেবাটি বেছে নিন</p>
                        </div>
                    </div>

                    {/* Desktop: Grid | Mobile: Carousel */}
                    <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                        {services.map((s) => (
                            <div
                                key={s.key}
                                onClick={() => navigate(`/dokkho/customer/services/${s.key}`)}
                                className="flex-shrink-0 w-24 md:w-auto bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] flex flex-col items-center gap-3 shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                            >
                                <div className={`w-14 h-14 md:w-16 md:h-16 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform`}>
                                    <s.icon />
                                </div>
                                <span className="text-xs md:text-sm font-bold text-gray-700 text-center">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- FEATURED & NEARBY GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Featured Section (Left 2/3 on Desktop) */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-black text-gray-800 mb-6">জনপ্রিয় সেবা</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FeaturedCard title="জরুরী বিদ্যুৎ মেরামত" img="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600" desc="অভিজ্ঞ ইলেকট্রিশিয়ান পান ১০ মিনিটে" />
                            <FeaturedCard title="বাসা বদল সার্ভিস" img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" desc="নিরাপদ এবং দ্রুত শিফটিং সুবিধা" />
                            <FeaturedCard title="প্লাম্বিং সলিউশন" img="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600" desc="পাইপ লিক বা নতুন ফিটিং এর জন্য" />
                            <FeaturedCard title="রঙের কাজ" img="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600" desc="আপনার ঘরকে দিন নতুন রূপ" />
                        </div>
                    </div>

                    {/* Nearby Providers (Right 1/3 on Desktop) */}
                    {/* --- NEARBY PROVIDERS SECTION --- */}
                    <div className="lg:col-span-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-gray-800">নিকটস্থ দক্ষ জন</h2>
                            <span
                                className="text-[#008080] text-xs font-bold cursor-pointer hover:underline"
                                onClick={() => navigate('/dokkho/customer/providers')}
                            >
                                সবগুলো
                            </span>
                        </div>

                        <div className="space-y-4">
                            {nearbyLoading ? (
                                <p className="text-gray-400 text-sm">খোঁজা হচ্ছে...</p>
                            ) : nearbyProviders.length > 0 ? (
                                nearbyProviders.map((provider) => (
                                    <ProviderCard key={provider._id} provider={provider} navigate={navigate} />
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm italic">
                                    দুঃখিত, আপনার এলাকায় এই মুহূর্তে কেউ নেই।
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </main>

            {/* --- MOBILE BOTTOM NAV (Hidden on Desktop) --- */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <MobileNavItem icon={<IoGridOutline />} label="হোম" active />
                <MobileNavItem icon={<IoSearchOutline />} label="সার্চ" />
                <MobileNavItem icon={<IoBookOutline />} label="বুকিং" />
                <MobileNavItem icon={<FaRegUserCircle />} label="প্রোফাইল" />
            </div>
        </div>
    );
};

// --- SUB COMPONENTS WITH UX BEST PRACTICES ---

const FeaturedCard = ({ title, img, desc }) => (
    <div className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer shadow-md">
        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
            <h3 className="text-white font-bold text-lg">{title}</h3>
            <p className="text-gray-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{desc}</p>
        </div>
    </div>
);

const ProviderCard = ({ provider, navigate }) => (

    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:border-[#008080] hover:shadow-lg transition-all cursor-pointer group">
        <div className="relative">
            <img src={provider.profileImage} alt={provider.name} className="w-14 h-14 rounded-xl object-cover" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm group-hover:text-[#008080]">{provider.name}</h4>
            <p className="text-[11px] text-gray-500">{provider.serviceName}</p>
            <div className="flex items-center gap-1 mt-1">
                <FaStar className="text-yellow-400 text-[10px]" />
                <span className="text-[10px] font-bold text-gray-600">{provider.rating}</span>
                <span className="text-[10px] text-gray-400 ml-2">{provider.experience} বছরের অভিজ্ঞতা</span>
            </div>
        </div>
        <button
            onClick={() => navigate(`/dokkho/provider/${provider._id}`)}
            className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-[#008080]/10 hover:text-[#008080] transition-colors"
        >
            <MdArrowForwardIos />
        </button>
    </div>
);

const MobileNavItem = ({ icon, label, active = false }) => (
    <div className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${active ? 'text-[#008080] bg-[#008080]/5' : 'text-gray-400'}`}>
        <div className="text-xl">{icon}</div>
        <span className="text-[10px] font-bold">{label}</span>
    </div>
);

export default CustomerDashboard;