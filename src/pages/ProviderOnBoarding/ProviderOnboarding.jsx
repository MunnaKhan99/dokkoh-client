import { useState, useContext, useEffect } from "react";
import {
    FaBolt,
    FaTools,
    FaBook,
    FaBriefcase,
    FaPhoneAlt,
    FaWhatsapp,
} from "react-icons/fa";
import { dokkhoContext } from "../../Layout/RootLayout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";

const ProviderOnboarding = () => {
    const { providerData, setProviderData, submitProviderOnboarding } = useContext(dokkhoContext);
    const [step, setStep] = useState(1);
    // const [locationName, setLocationName] = useState("লোকেশন নেওয়া হচ্ছে...");
    const navigate = useNavigate()

    const [areas, setAreas] = useState([]); // লিস্ট রাখার জন্য স্টেট
    const [isLoading, setIsLoading] = useState(false);

    /* ---------- Step Navigation ---------- */
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    /* ---------- STEP 1: Service ---------- */
    const services = [
        { id: "electrician", label: "ইলেক্ট্রিশিয়ান", icon: <FaBolt /> },
        { id: "plumber", label: "প্লাম্বার", icon: <FaTools /> },
        { id: "tutor", label: "হোম টিউটর", icon: <FaBook /> },
        { id: "others", label: "অন্যান্য", icon: <FaBriefcase /> },
    ];

    const experiences = [
        { id: "১–৩", label: "১–৩ বছর" },
        { id: "৩–৫", label: "৩–৫ বছর" },
        { id: "৫–৮", label: "৫–৮ বছর" },
        { id: "৮–১৫", label: "৮–১৫ বছর" },
    ];

    const PARENT_AREAS = [
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

    /* ---------- STEP 2: Location ---------- */
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
    /* ---------- STEP 3: Contact ---------- */
    const toggleContact = (type) => {
        setProviderData({
            ...providerData,
            contact: {
                ...providerData.contact,
                [type]: !providerData.contact[type],
            },
        });
    };

    /* ---------- Submit ---------- */
    const handleComplete = async () => {
        const result = await submitProviderOnboarding();
        console.log(result);

        if (!result?.success) return;

        if (result.message === "Provider already exists") {
            Swal.fire({
                icon: "info",
                title: "আপনি ইতিমধ্যে রেজিস্টার্ড",
                text: "আপনার প্রোভাইডার প্রোফাইল আগেই তৈরি করা আছে",
            });

            navigate("/dokkho/provider/dashboard");
        }
        else if (result.providerId) {
            Swal.fire({
                icon: "success",
                title: "সফলভাবে সম্পন্ন হয়েছে",
                text: "আপনার প্রোভাইডার প্রোফাইল তৈরি হয়েছে",
            });

            navigate("/dokkho/provider/dashboard");
        }
    };
    useEffect(() => {
        const fetchAreas = async () => {
            try {
                setIsLoading(true);
                // আমরা ঢাকা শহরের নির্দিষ্ট এলাকা (suburb) গুলোকে টার্গেট করছি
                const res = await axios.get(
                    `https://nominatim.openstreetmap.org/search?q=Dhaka&format=json&addressdetails=1&accept-language=bn&limit=100`
                );

                const areaNames = res.data
                    .map(item => {
                        const addr = item.address;
                        // এখানে আমরা অগ্রাধিকার ভিত্তিতে নামগুলো চেক করছি
                        return addr.quarter || addr.suburb || addr.neighbourhood || addr.city_district;
                    })
                    .filter(name => name !== undefined && name !== "" && name !== "ঢাকা"); // "ঢাকা" নামটা বাদ দিচ্ছি যাতে শুধু এলাকা দেখায়

                // ডুপ্লিকেট নাম বাদ দেওয়া
                const uniqueAreas = [...new Set(areaNames)];

                if (uniqueAreas.length > 0) {
                    setAreas(uniqueAreas.sort()); // বর্ণানুসারে সাজানো
                } else {
                    // যদি API থেকে কিছু না আসে তবে ব্যাকআপ লিস্ট
                    setAreas(["ধানমন্ডি", "মিরপুর", "উত্তরা", "মোহাম্মদপুর", "গুলশান", "বনানী", "সাভার"]);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Area fetching error:", error);
                setIsLoading(false);
            }
        };

        fetchAreas();
    }, []);



    return (
        <div className="min-h-screen bg-gray-50 flex justify-center pt-10">
            <div className="w-full max-w-3xl bg-white rounded-xl p-10 shadow">

                {/* ---------- Progress ---------- */}
                <p className="text-sm text-gray-500 mb-2">Step {step} of 3</p>
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-2 flex-1 rounded-full ${s <= step ? "bg-green-500" : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>

                {/* ---------- STEP 1 ---------- */}
                {step === 1 && (
                    <>
                        <label className="block mb-2 font-medium">
                            আপনার নাম লিখুন
                        </label>

                        <input
                            type="text"
                            placeholder="আপনার নাম"
                            value={providerData.name}
                            onChange={(e) =>
                                setProviderData({
                                    ...providerData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full border rounded-xl p-4 mb-6"
                        />

                        <h2 className="text-2xl font-semibold mb-2">
                            আপনি কোন ধরনের সেবা দেন?
                        </h2>
                        <p className="text-gray-500 mb-8">
                            আপনার প্রধান সেবার ধরন নির্বাচন করুন
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {services.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() =>
                                        setProviderData({ ...providerData, service: item.id })
                                    }
                                    className={`cursor-pointer border rounded-xl h-40 flex flex-col items-center justify-center gap-4
                    ${providerData.service === item.id
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200"
                                        }`}
                                >
                                    <div className="text-3xl text-green-500">
                                        {item.icon}
                                    </div>
                                    <p className="font-medium">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-2xl font-semibold mt-12 mb-2">
                            আপনার কত বছরের অভিজ্ঞতা?
                        </h2>
                        <p className="text-gray-500 mb-8">
                            আপনার মোট কাজের অভিজ্ঞতা নির্বাচন করুন
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {experiences.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() =>
                                        setProviderData({
                                            ...providerData,
                                            experience: item.id,
                                        })
                                    }

                                    className={`cursor-pointer border rounded-xl h-24 flex items-center justify-center
                ${providerData.experience === item.id
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200"
                                        }`}
                                >
                                    <p className="font-medium">{item.label}</p>
                                </div>
                            ))}
                        </div>


                        <button
                            disabled={!providerData.service || !providerData.name || !providerData.experience}
                            onClick={nextStep}
                            className="mt-10 w-full bg-green-500 text-white py-4 rounded-xl disabled:opacity-50"
                        >
                            এগিয়ে যান
                        </button>
                    </>
                )}

                {/* ---------- STEP 2 ---------- */}
                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-2">
                            আপনি সাধারণত কোথায় কাজ করেন?
                        </h2>
                        <p className="text-gray-500 mb-8">
                            আপনার কাজের এলাকা নির্বাচন করুন
                        </p>

                        {/* অটো লোকেশন বাটন */}
                        <button
                            type="button"
                            onClick={async () => {
                                if (!navigator.geolocation) return alert("লোকেশন সাপোর্ট নেই।");
                                navigator.geolocation.getCurrentPosition(async (pos) => {
                                    try {
                                        const { latitude, longitude } = pos.coords;
                                        const res = await axios.get(
                                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=bn`
                                        );
                                        const adr = res.data.address;
                                        const detectedArea = adr.suburb || adr.neighbourhood || adr.city_district || adr.town || adr.village;

                                        if (detectedArea) {
                                            const detectedSub =
                                                adr.suburb ||
                                                adr.quarter ||
                                                adr.neighbourhood ||
                                                adr.city_district;

                                            const parentArea = AREA_PARENT_MAP[detectedSub];

                                            if (parentArea) {
                                                setProviderData({
                                                    ...providerData,
                                                    locationParent: parentArea,
                                                    locationSub: detectedSub,
                                                });

                                                Swal.fire({
                                                    icon: "success",
                                                    title: "লোকেশন সনাক্ত হয়েছে",
                                                    text: `${detectedSub} (${parentArea})`,
                                                });
                                            } else {
                                                Swal.fire({
                                                    icon: "warning",
                                                    title: "এলাকা সনাক্ত হয়নি",
                                                    text: "দয়া করে ম্যানুয়ালি এলাকা নির্বাচন করুন",
                                                });
                                            }
                                            // Swal ব্যবহার করলে দেখতে আরও সুন্দর লাগবে
                                            alert(`সনাক্ত করা এলাকা: ${detectedArea}`);
                                        }
                                    } catch (error) {
                                        alert("লোকেশন খুঁজে পাওয়া যায়নি।");
                                    }
                                });
                            }}
                            className="w-full mb-4 py-3 px-4 bg-blue-50 border border-blue-200 text-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition"
                        >
                            <MdLocationOn /> বর্তমান লোকেশন ব্যবহার করুন
                        </button>

                        <select
                            className="w-full border rounded-xl p-4 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
                            value={providerData.locationParent}
                            onChange={(e) =>
                                setProviderData({
                                    ...providerData,
                                    locationParent: e.target.value,
                                })
                            }
                        >
                            <option value="">এরিয়া নির্বাচন করুন</option>

                            {PARENT_AREAS.map((area) => (
                                <option key={area.key} value={area.key}>
                                    {area.label}
                                </option>
                            ))}
                        </select>


                        {/* আপনার কোডে এই অংশটি ইনকমপ্লিট ছিল, এটি যোগ করে দিলাম */}
                        <label className="flex items-center gap-2 mb-8 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="w-5 h-5 accent-green-500 rounded"
                                checked={providerData.areaOnly || false}
                                onChange={(e) =>
                                    setProviderData({
                                        ...providerData,
                                        areaOnly: e.target.checked,
                                    })
                                }
                            />
                            <span className="text-gray-700">আমি শুধু এই এলাকাতেই কাজ করি</span>
                        </label>

                        <div className="flex gap-4">
                            <button
                                onClick={prevStep}
                                className="w-1/2 border py-4 rounded-xl hover:bg-gray-50 transition"
                            >
                                পেছনে
                            </button>
                            <button
                                disabled={!providerData.locationParent}
                                onClick={nextStep}
                                className="w-1/2 bg-green-500 text-white py-4 rounded-xl disabled:opacity-50 hover:bg-green-600 transition font-medium"
                            >
                                এগিয়ে যান
                            </button>
                        </div>
                    </>
                )}

                {/* ---------- STEP 3 ---------- */}
                {step === 3 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-2">
                            গ্রাহকরা কীভাবে আপনার সাথে যোগাযোগ করবে?
                        </h2>
                        <p className="text-gray-500 mb-8">
                            যোগাযোগের মাধ্যম নির্বাচন করুন
                        </p>

                        <div
                            onClick={() => toggleContact("phone")}
                            className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer mb-4
                ${providerData.contact.phone
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200"
                                }`}
                        >
                            <FaPhoneAlt className="text-green-500" />
                            ফোন কল
                        </div>

                        <div
                            onClick={() => toggleContact("whatsapp")}
                            className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer mb-6
                ${providerData.contact.whatsapp
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200"
                                }`}
                        >
                            <FaWhatsapp className="text-green-500" />
                            হোয়াটসঅ্যাপ
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={prevStep}
                                className="w-1/2 border py-4 rounded-xl"
                            >
                                পেছনে
                            </button>
                            <button
                                onClick={handleComplete}
                                className="w-full bg-green-500 text-white py-4 rounded-xl"
                            >
                                সেটআপ সম্পন্ন করুন
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProviderOnboarding;
