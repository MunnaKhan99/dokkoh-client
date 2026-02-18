import { FaBolt, FaTools, FaBook, FaBriefcase } from "react-icons/fa";

// icon হিসেবে component reference রাখা হয়েছে, JSX না
// ব্যবহার করতে হবে এভাবে: <item.icon className="text-2xl" />
export const SERVICES = [
    { id: "electrician", label: "ইলেক্ট্রিশিয়ান", icon: FaBolt },
    { id: "plumber", label: "প্লাম্বার", icon: FaTools },
    { id: "tutor", label: "হোম টিউটর", icon: FaBook },
    { id: "others", label: "অন্যান্য", icon: FaBriefcase },
];

export const EXPERIENCES = [
    { id: "১–৩", label: "১–৩ বছর" },
    { id: "৩–৫", label: "৩–৫ বছর" },
    { id: "৫–৮", label: "৫–৮ বছর" },
    { id: "৮–১৫", label: "৮–১৫ বছর" },
];

export const PARENT_AREAS = [
    { key: "mirpur", label: "মিরপুর" },
    { key: "dhanmondi", label: "ধানমন্ডি" },
    { key: "uttara", label: "উত্তরা" },
    { key: "mohammadpur", label: "মোহাম্মদপুর" },
    { key: "gulshan", label: "গুলশান / বনানী" },
    { key: "tejgaon", label: "তেজগাঁও" },
    { key: "badda", label: "বাড্ডা / রামপুরা" },
    { key: "khilgaon", label: "খিলগাঁও" },
    { key: "jatrabari", label: "যাত্রাবাড়ী" },
    { key: "olddhaka", label: "পুরান ঢাকা" },
    { key: "savar", label: "সাভার" },
];

export const AREA_PARENT_MAP = {
    /* ===================== MIRPUR ===================== */
    "মিরপুর": "mirpur", "মিরপুর ১": "mirpur", "মিরপুর ২": "mirpur",
    "মিরপুর ৬": "mirpur", "মিরপুর ৭": "mirpur", "মিরপুর ১০": "mirpur",
    "মিরপুর ১১": "mirpur", "মিরপুর ১১.৫": "mirpur", "মিরপুর ১২": "mirpur",
    "মিরপুর ১৩": "mirpur", "মিরপুর ১৪": "mirpur", "পল্লবী": "mirpur",
    "রূপনগর": "mirpur", "কালশী": "mirpur", "কাজীপাড়া": "mirpur",
    "পশ্চিম কাজীপাড়া": "mirpur", "পূর্ব কাজীপাড়া": "mirpur",
    "শেওড়াপাড়া": "mirpur", "পশ্চিম শেওড়াপাড়া": "mirpur",
    "পূর্ব শেওড়াপাড়া": "mirpur", "সেনপাড়া পর্বতা": "mirpur",
    "মনিপুর": "mirpur", "ইব্রাহিমপুর": "mirpur", "টোলারবাগ": "mirpur",
    "পাইকপাড়া": "mirpur", "আহমেদ নগর": "mirpur", "মিরপুর ডিওএইচএস": "mirpur",
    "ডি.ও.এইচ.এস মিরপুর": "mirpur", "দারুস সালাম": "mirpur",
    "গাবতলী": "mirpur", "মাজার রোড": "mirpur",

    /* ===================== DHANMONDI ===================== */
    "ধানমন্ডি": "dhanmondi", "ধানমন্ডি আবাসিক এলাকা": "dhanmondi",
    "জিগাতলা": "dhanmondi", "শংকর": "dhanmondi", "রায়ের বাজার": "dhanmondi",
    "কলাবাগান": "dhanmondi", "সোবহানবাগ": "dhanmondi", "শুক্রাবাদ": "dhanmondi",
    "হাজারীবাগ": "dhanmondi", "ট্যানারি মোড়": "dhanmondi", "নিউ মার্কেট": "dhanmondi",
    "আজিমপুর": "dhanmondi", "লালমাটিয়া": "dhanmondi", "কাটাবন": "dhanmondi",
    "নীলক্ষেত": "dhanmondi",

    /* ===================== MOHAMMADPUR ===================== */
    "মোহাম্মদপুর": "mohammadpur", "বসিলা": "mohammadpur", "জহুরি মহল্লা": "mohammadpur",
    "জাফরাবাদ": "mohammadpur", "নূরজাহান রোড": "mohammadpur", "তাজমহল রোড": "mohammadpur",
    "চাঁদ উদ্যান": "mohammadpur", "নবোদয় হাউজিং": "mohammadpur",
    "শেকেরটেক": "mohammadpur", "আদাবর": "mohammadpur", "বায়তুল আমান": "mohammadpur",
    "আসাদ গেট": "mohammadpur",

    /* ===================== UTTARA ===================== */
    "উত্তরা": "uttara", "আজমপুর": "uttara", "আব্দুল্লাহপুর": "uttara",
    "উত্তরা সেক্টর ১": "uttara", "উত্তরা সেক্টর ২": "uttara",
    "উত্তরা সেক্টর ৩": "uttara", "উত্তরা সেক্টর ৪": "uttara",
    "উত্তরা সেক্টর ৫": "uttara", "উত্তরা সেক্টর ৬": "uttara",
    "উত্তরা সেক্টর ৭": "uttara", "উত্তরা সেক্টর ৮": "uttara",
    "উত্তরা সেক্টর ৯": "uttara", "উত্তরা সেক্টর ১০": "uttara",
    "উত্তরা সেক্টর ১১": "uttara", "উত্তরা সেক্টর ১২": "uttara",
    "উত্তরা সেক্টর ১৩": "uttara", "উত্তরা সেক্টর ১৪": "uttara",
    "উত্তরা সেক্টর ১৫": "uttara", "উত্তরা সেক্টর ১৬": "uttara",
    "উত্তরা সেক্টর ১৭": "uttara", "উত্তরা সেক্টর ১৮": "uttara",
    "দিয়াবাড়ি": "uttara", "তুরাগ": "uttara", "কামারপাড়া": "uttara",

    /* ===================== GULSHAN / BANANI ===================== */
    "গুলশান": "gulshan", "গুলশান ১": "gulshan", "গুলশান ২": "gulshan",
    "বনানী": "gulshan", "বনানী ডিওএইচএস": "gulshan", "কড়াইল": "gulshan",
    "বারিধারা": "gulshan", "বারিধারা ডিওএইচএস": "gulshan",
    "বারিধারা জে ব্লক": "gulshan", "নিকেতন": "gulshan",
    "মহাখালী": "gulshan", "মহাখালী ডিওএইচএস": "gulshan",
    "নিকুঞ্জ": "gulshan", "নিকুঞ্জ ১": "gulshan", "নিকুঞ্জ ২": "gulshan",
    "খাপড়া": "gulshan", "কুড়িল": "gulshan", "নর্দা": "gulshan",

    /* ===================== TEJGAON ===================== */
    "তেজগাঁও": "tejgaon", "তেজগাঁও শিল্প এলাকা": "tejgaon",
    "নাকহালপাড়া": "tejgaon", "ফার্মগেট": "tejgaon", "কারওয়ান বাজার": "tejgaon",
    "রাজাবাজার": "tejgaon", "পশ্চিম রাজাবাজার": "tejgaon",
    "পূর্ব রাজাবাজার": "tejgaon", "পান্থপথ": "tejgaon",
    "ইন্দিরা রোড": "tejgaon", "মণিপুরিপাড়া": "tejgaon",

    /* ===================== BADDA / RAMPURA ===================== */
    "বাড্ডা": "badda", "উত্তর বাড্ডা": "badda", "মধ্য বাড্ডা": "badda",
    "দক্ষিণ বাড্ডা": "badda", "মেরুল বাড্ডা": "badda", "সাতারকুল": "badda",
    "রামপুরা": "badda", "বনশ্রী": "badda", "পূর্ব রামপুরা": "badda",
    "টিভি সেন্টার": "badda", "আফতাবনগর": "badda", "উলন": "badda",

    /* ===================== KHILGAON ===================== */
    "খিলগাঁও": "khilgaon", "গোরান": "khilgaon", "দক্ষিণগাঁও": "khilgaon",
    "বাসাবো": "khilgaon", "সবুজবাগ": "khilgaon", "মুগদা": "khilgaon",
    "মাদারটেক": "khilgaon", "নন্দীপাড়া": "khilgaon",

    /* ===================== JATRABARI ===================== */
    "যাত্রাবাড়ী": "jatrabari", "সায়েদাবাদ": "jatrabari", "ধলপুর": "jatrabari",
    "ডেমরা": "jatrabari", "সারুলিয়া": "jatrabari", "কোনাপাড়া": "jatrabari",
    "দনিয়া": "jatrabari", "মাতুয়াইল": "jatrabari",

    /* ===================== OLD DHAKA ===================== */
    "লালবাগ": "olddhaka", "কোতোয়ালি": "olddhaka", "সূত্রাপুর": "olddhaka",
    "শাঁখারীবাজার": "olddhaka", "চকবাজার": "olddhaka", "আরমানিটোলা": "olddhaka",
    "ইসলামপুর": "olddhaka", "ওয়ারী": "olddhaka", "গেন্ডারিয়া": "olddhaka",
    "নারিন্দা": "olddhaka", "ধোলাইখাল": "olddhaka", "সদরঘাট": "olddhaka",
    "তাঁতীবাজার": "olddhaka", "বাবু বাজার": "olddhaka", "বংশাল": "olddhaka",

    /* ===================== SAVAR ===================== */
    "সাভার": "savar", "আশুলিয়া": "savar", "ধামসোনা": "savar",
    "হেমায়েতপুর": "savar", "নবীনগর": "savar", "জিরাবো": "savar",
};