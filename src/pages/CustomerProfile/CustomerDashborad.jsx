import { useContext } from "react";
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

const CustomerDashboard = () => {
    const { user } = useContext(dokkhoContext);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-[#0FA958] pt-6 pb-12 px-8 text-white">
                <div className="flex justify-between max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold">দক্ষ</h1>
                        <p className="text-sm opacity-90">
                            আপনার বিশ্বস্ত স্থানীয় সেবা মাধ্যম
                        </p>
                    </div>
                    <Link to="/dokkho/customer/profile">
                        <FaRegUserCircle size={28} />
                    </Link>
                </div>

                {/* Location */}
                <div className="max-w-7xl mx-auto mt-8">
                    <div className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                        <MdLocationOn size={22} />
                        <div>
                            <p className="text-xs font-bold">বর্তমান অবস্থান</p>
                            <p className="text-sm">ধানমণ্ডি, ঢাকা</p>
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
                        placeholder="প্রয়োজনীয় সেবাটি খুঁজুন..."
                        className="w-full pl-12 py-4 rounded-xl shadow-lg focus:ring-2 bg-white focus:ring-emerald-500 outline-none"
                    />
                </div>

                {/* Popular Services */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold border-l-4 border-[#0FA958] pl-3 mb-6">
                        জনপ্রিয় সেবাসমূহ
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.key}
                                    onClick={() =>
                                        navigate(`/dokkho/customer/services/${service.key}`)
                                    }
                                    className="cursor-pointer bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow hover:shadow-md transition"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-full ${service.bg} flex items-center justify-center text-2xl ${service.color}`}
                                    >
                                        <Icon />
                                    </div>
                                    <span className="font-bold text-gray-700">
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
