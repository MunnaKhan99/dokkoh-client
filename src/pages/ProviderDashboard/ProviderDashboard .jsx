import { useContext, useEffect, useState } from "react";
import { FaStar, FaEdit, FaArrowLeft } from "react-icons/fa";
import { MdLocationOn, MdCircle } from "react-icons/md";
import { ProviderContext } from "../../Layout/ProviderLayout";
import NoProvider from "../NoProvider/NoProvider";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router";
import axios from "axios";
import { MdBuild} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const ProviderDashboard = () => {
    const navigate = useNavigate();
    const { provider, checkingProvider, toggleProviderAvailability } =
        useContext(ProviderContext);

    const [locationName, setLocationName] = useState("লোকেশন নেওয়া হচ্ছে...");

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationName("লোকেশন সাপোর্ট করে না");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;

                    const res = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=bn`,
                        {
                            withCredentials: false,
                            headers: {
                                "Accept": "application/json",
                                // Nominatim often blocks requests without UA
                                "User-Agent": "dokkho-app/1.0 (provider-dashboard)",
                            },
                        }
                    );

                    const address = res.data?.address;

                    const sub =
                        address?.suburb ||
                        address?.quarter ||
                        address?.neighbourhood ||
                        address?.city_district ||
                        address?.city;

                    setLocationName(sub || "আপনার এলাকা");

                } catch (err) {
                    console.error("Reverse geocode failed:", err);
                    setLocationName("লোকেশন পাওয়া যায়নি");
                }
            },

            (err) => {
                console.warn("Geolocation error:", err);
                setLocationName("লোকেশন পারমিশন বন্ধ");
            }

        );

    }, []);

    if (checkingProvider) {
        return <p className="flex justify-center items-center h-screen">লোড হচ্ছে...</p>;
    }

    if (!provider) {
        return <NoProvider />;
    }

    const chartSeries = [
        { name: "কার্যক্রম", data: [1200, 1400, 1500, 1300, 1800] },
    ];

    const chartOptions = {
        chart: { toolbar: { show: false }, zoom: { enabled: false } },
        stroke: { curve: "smooth", width: 3 },
        colors: ["#F43F5E"],
        xaxis: {
            categories: ["৮ দিন", "১০ দিন", "১২ দিন", "১৪ দিন", "আজ"],
            labels: { show: false },
        },
        yaxis: { labels: { show: false } },
        grid: { strokeDashArray: 4 },
        tooltip: { theme: "light" },
    };

    return (
        <div className="min-h-screen bg-[#FFF5F5] p-4 pb-24">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo Area */}
                        <div className="flex items-center gap-3">
                            <div className="bg-[#008080] p-2 rounded-xl text-white shadow-lg">
                                <MdBuild size={22} />
                            </div>
                            <span className="text-xl font-bold text-gray-800 hidden sm:block">
                                দক্ষ (প্রোভাইডার)
                            </span>
                        </div>

                        {/* Right Actions (No Search, No Notification) */}
                        <div className="flex items-center gap-2 md:gap-5">
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                    বর্তমান অবস্থান
                                </p>
                                <div className="flex items-center text-xs font-semibold text-gray-700">
                                    <MdLocationOn className="text-red-500" /> {locationName}
                                </div>
                            </div>

                            <div
                                className="flex items-center gap-2 cursor-pointer p-1 pr-3 hover:bg-gray-100 rounded-full transition-all"
                                onClick={() => navigate("/dokkho/provider/profile")}
                            >
                                <FaRegUserCircle size={30} className="text-gray-600" />
                                <span className="hidden lg:block text-sm font-bold text-gray-700">
                                    আমার প্রোফাইল
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>



            {/* Online / Offline Status */}
            <div className="bg-white rounded-2xl p-4 mb-4 flex justify-between items-center shadow-sm">
                <div>
                    <p className="text-sm text-gray-500">স্ট্যাটাস</p>
                    <div className="flex items-center gap-2 mt-1">
                        <MdCircle
                            className={`text-xs ${provider.availability
                                ? "text-green-500 animate-pulse"
                                : "text-red-500"
                                }`}
                        />
                        <p className="font-bold text-gray-800">
                            {provider.availability ? "অনলাইন" : "অফলাইন"}
                        </p>
                    </div>
                </div>

                <button
                    onClick={toggleProviderAvailability}
                    className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 ${provider.availability
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                        }`}
                >
                    <MdCircle
                        className={`text-[8px] ${provider.availability
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                    />
                    {provider.availability ? "অনলাইন" : "অফলাইন"}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#FFE4E6] p-4 rounded-2xl">
                    <p className="text-xs text-gray-500">রিভিউ</p>
                    <p className="text-xl font-black text-gray-800">
                        {provider.ratingCount || 0}
                    </p>
                </div>

                <div className="bg-[#FFF1DB] p-4 rounded-2xl">
                    <p className="text-xs text-gray-500">রেটিং</p>
                    <p className="text-xl font-black text-gray-800 flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        {provider.rating || 5.0}
                    </p>
                </div>

                <div className="bg-[#F1F5FF] p-4 rounded-2xl col-span-2">
                    <p className="text-xs text-gray-500">অভিজ্ঞতা</p>
                    <p className="text-xl font-black text-gray-800">
                        {provider.experience || "১+"} বছর
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                <p className="font-bold text-sm mb-2">আপনার কার্যক্রম</p>
                <div className="h-40">
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="line"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
