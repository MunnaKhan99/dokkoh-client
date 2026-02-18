import { useEffect, useContext, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaStar, FaSearch, FaTimes } from "react-icons/fa";
import { CustomerContext } from "../../Layout/CustomerLayout";

const ServiceList = () => {
    const { serviceKey } = useParams();
    const navigate = useNavigate();
    const { providers, providersLoading, fetchProviders, customerParentArea } =
        useContext(CustomerContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("rating");
    const [experienceFilter, setExperienceFilter] = useState("all");

    useEffect(() => {
        fetchProviders({ serviceKey, locationParent: customerParentArea });
    }, [serviceKey, customerParentArea]);

    const serviceTitles = {
        electrician: "ইলেক্ট্রিশিয়ান",
        tutor: "টিউটর",
        plumber: "প্লাম্বার",
        others: "অন্যান্য প্রোভাইডার",
    };

    const filteredProviders = useMemo(() => {
        let result = [...providers];
        if (searchQuery.trim()) {
            result = result.filter((p) =>
                p.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (experienceFilter !== "all") {
            result = result.filter((p) => {
                const exp = parseFloat(p.experience) || 0;
                if (experienceFilter === "1-3") return exp >= 1 && exp <= 3;
                if (experienceFilter === "3-5") return exp > 3 && exp <= 5;
                if (experienceFilter === "5+") return exp > 5;
                return true;
            });
        }
        if (sortBy === "rating") result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        else if (sortBy === "name") result.sort((a, b) => (a.name || "").localeCompare(b.name || "", "bn"));
        else if (sortBy === "experience") result.sort((a, b) => (parseFloat(b.experience) || 0) - (parseFloat(a.experience) || 0));
        return result;
    }, [providers, searchQuery, experienceFilter, sortBy]);

    const goToUserDetails = (id) => navigate(`/dokkho/provider/${id}`);

    const avatarColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#A29BFE", "#FD79A8", "#6C5CE7"];
    const getAvatarColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

    const experienceOptions = [
        { value: "all", label: "সব" },
        { value: "1-3", label: "১–৩ বছর" },
        { value: "3-5", label: "৩–৫ বছর" },
        { value: "5+", label: "৫+ বছর" },
    ];

    const sortOptions = [
        { value: "rating", label: "রেটিং" },
        { value: "name", label: "নাম" },
        { value: "experience", label: "অভিজ্ঞতা" },
    ];

    const FilterIcon = () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="12" y1="18" x2="20" y2="18" />
            <circle cx="4" cy="6" r="2" fill="currentColor" stroke="none" />
            <circle cx="8" cy="12" r="2" fill="currentColor" stroke="none" />
            <circle cx="12" cy="18" r="2" fill="currentColor" stroke="none" />
        </svg>
    );

    const SortIcon = () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
        </svg>
    );

    // ── Shared: Filter + Sort Panel (inline, used in sidebar & mobile) ──
    const FiltersPanel = () => (
        <div>
            {/* Experience */}
            <div className="mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <FilterIcon /> অভিজ্ঞতা
                </p>
                <div className="flex flex-col gap-1">
                    {experienceOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setExperienceFilter(opt.value)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${experienceFilter === opt.value
                                    ? "bg-[#4169E1] text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${experienceFilter === opt.value ? "border-white/70" : "border-gray-300"
                                }`}>
                                {experienceFilter === opt.value && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                                )}
                            </span>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-5" />

            {/* Sort */}
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <SortIcon /> সাজান
                </p>
                <div className="flex flex-col gap-1">
                    {sortOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setSortBy(opt.value)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${sortBy === opt.value
                                    ? "bg-[#4169E1] text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${sortBy === opt.value ? "border-white/70" : "border-gray-300"
                                }`}>
                                {sortBy === opt.value && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                                )}
                            </span>
                            {opt.label === "রেটিং" ? "রেটিং (বেশি → কম)" :
                                opt.label === "নাম" ? "নাম অনুযায়ী" :
                                    "অভিজ্ঞতা (বেশি → কম)"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reset */}
            {(experienceFilter !== "all" || sortBy !== "rating") && (
                <button
                    onClick={() => { setExperienceFilter("all"); setSortBy("rating"); }}
                    className="mt-5 w-full text-xs text-gray-400 hover:text-red-500 transition-colors py-2 border border-dashed border-gray-200 rounded-xl"
                >
                    রিসেট করুন
                </button>
            )}
        </div>
    );

    // ── Provider Row (mobile list style) ──
    const ProviderRow = ({ provider }) => (
        <div
            onClick={() => goToUserDetails(provider._id)}
            className="flex items-center gap-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-1 rounded-xl"
        >
            {provider.profileImage ? (
                <img src={provider.profileImage} alt={provider.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            ) : (
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: getAvatarColor(provider.name) }}
                >
                    {provider.name?.slice(0, 1).toUpperCase()}
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm leading-snug truncate">
                    {provider.name || "নাম পাওয়া যায়নি"}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                    {provider.serviceName || serviceTitles[serviceKey]}
                </p>
                <div className="flex items-center gap-1 mt-1">
                    <FaStar className="text-amber-400 text-xs" />
                    <span className="text-gray-700 text-xs font-semibold">
                        {provider.rating > 0 ? provider.rating.toFixed(1) : "0.0"}
                    </span>
                    {provider.ratingCount > 0 && (
                        <span className="text-gray-400 text-xs">({provider.ratingCount})</span>
                    )}
                    {provider.experience && (
                        <>
                            <span className="text-gray-200 mx-1">•</span>
                            <span className="text-gray-400 text-xs">{provider.experience} বছরের অভিজ্ঞতা</span>
                        </>
                    )}
                </div>
            </div>
            <span className="text-gray-300 text-2xl font-light flex-shrink-0 group-hover:text-[#4169E1]">›</span>
        </div>
    );

    // ── Provider Card (tablet/desktop grid style) ──
    const ProviderCard = ({ provider }) => (
        <div
            onClick={() => goToUserDetails(provider._id)}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
        >
            <div className="flex flex-col items-center text-center">
                {provider.profileImage ? (
                    <img src={provider.profileImage} alt={provider.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                ) : (
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3"
                        style={{ backgroundColor: getAvatarColor(provider.name) }}
                    >
                        {provider.name?.slice(0, 1).toUpperCase()}
                    </div>
                )}
                <p className="text-gray-900 font-semibold text-sm leading-snug mb-0.5 truncate w-full">
                    {provider.name || "নাম পাওয়া যায়নি"}
                </p>
                <p className="text-gray-400 text-xs mb-2">
                    {provider.serviceName || serviceTitles[serviceKey]}
                </p>
                <div className="flex items-center justify-center gap-1">
                    <FaStar className="text-amber-400 text-xs" />
                    <span className="text-gray-700 text-xs font-semibold">
                        {provider.rating > 0 ? provider.rating.toFixed(1) : "0.0"}
                    </span>
                    {provider.ratingCount > 0 && (
                        <span className="text-gray-400 text-xs">({provider.ratingCount})</span>
                    )}
                </div>
                {provider.experience && (
                    <p className="text-gray-400 text-xs mt-1">{provider.experience} বছরের অভিজ্ঞতা</p>
                )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
                <button className="w-full text-xs text-[#4169E1] font-semibold group-hover:underline">
                    বিস্তারিত দেখুন →
                </button>
            </div>
        </div>
    );

    // ── Skeleton: Row ──
    const SkeletonRow = () => (
        <div className="flex items-center gap-4 py-4 border-b border-gray-100 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-2/5 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
        </div>
    );

    // ── Skeleton: Card ──
    const SkeletonCard = () => (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');`}</style>

            {/* ══════════════════════════════════════════
          MOBILE LAYOUT  (max-width: 767px)
      ══════════════════════════════════════════ */}
            <div className="md:hidden flex flex-col min-h-screen bg-white">

                {/* Header */}
                <div className="bg-white px-4 pt-12 pb-3 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition flex-shrink-0"
                    >
                        <FaArrowLeft className="text-gray-800 text-sm" />
                    </button>
                    <h1 className="text-gray-900 font-semibold text-base">প্রোভাইডার খুঁজুন</h1>
                </div>

                {/* Search */}
                <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
                        <FaSearch className="text-gray-400 text-sm flex-shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="পরিষেবা বা প্রোভাইডার খুঁজুন..."
                            className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="text-gray-400">
                                <FaTimes className="text-xs" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Experience filter chips */}
                <div className="px-4 pb-3">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">অভিজ্ঞতা</p>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {experienceOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setExperienceFilter(opt.value)}
                                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${experienceFilter === opt.value
                                        ? "bg-[#4169E1] text-white border-[#4169E1]"
                                        : "bg-white text-gray-500 border-gray-200"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort chips */}
                <div className="px-4 pb-4">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">সাজান</p>
                    <div className="flex gap-2">
                        {sortOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setSortBy(opt.value)}
                                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${sortBy === opt.value
                                        ? "bg-[#4169E1] text-white border-[#4169E1]"
                                        : "bg-white text-gray-500 border-gray-200"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section label */}
                <div className="px-4 py-2 bg-gray-50 border-y border-gray-100">
                    <p className="text-gray-700 font-semibold text-sm">
                        অন্যান্য প্রোভাইডার
                        {!providersLoading && (
                            <span className="ml-2 text-gray-400 font-normal text-xs">
                                ({filteredProviders.length} জন)
                            </span>
                        )}
                    </p>
                </div>

                {/* List */}
                <div className="px-4 bg-white flex-1">
                    {providersLoading && [1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}

                    {!providersLoading && filteredProviders.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-4xl mb-3">🔍</p>
                            <p className="text-gray-400 text-sm">
                                {searchQuery ? `"${searchQuery}" পাওয়া যায়নি` : "কোনো প্রোভাইডার নেই"}
                            </p>
                        </div>
                    )}

                    {!providersLoading && filteredProviders.map((provider) => (
                        <ProviderRow key={provider._id} provider={provider} />
                    ))}
                </div>
            </div>


            {/* ══════════════════════════════════════════
          TABLET LAYOUT  (768px – 1023px)
      ══════════════════════════════════════════ */}
            <div className="hidden md:block lg:hidden min-h-screen">

                {/* Header */}
                <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
                    <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition flex-shrink-0"
                        >
                            <FaArrowLeft className="text-gray-700 text-sm" />
                        </button>
                        <div className="flex-1">
                            <h1 className="text-gray-900 font-bold text-base leading-tight">
                                {serviceTitles[serviceKey] || "প্রোভাইডার"} খুঁজুন
                            </h1>
                            {!providersLoading && (
                                <p className="text-gray-400 text-xs">{filteredProviders.length} জন পাওয়া গেছে</p>
                            )}
                        </div>
                        {/* Search */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 w-64">
                            <FaSearch className="text-gray-400 text-xs flex-shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="নাম দিয়ে খুঁজুন..."
                                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")}>
                                    <FaTimes className="text-gray-400 text-xs" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body: sidebar + grid */}
                <div className="max-w-3xl mx-auto px-6 py-6 flex gap-6">

                    {/* Sidebar */}
                    <aside className="w-48 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-24">
                            <FiltersPanel />
                        </div>
                    </aside>

                    {/* Grid (2-col) */}
                    <main className="flex-1 min-w-0">
                        <p className="text-gray-700 font-semibold text-sm mb-4">
                            অন্যান্য প্রোভাইডার
                            {!providersLoading && (
                                <span className="ml-2 bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{filteredProviders.length} জন</span>
                            )}
                        </p>

                        {providersLoading && (
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
                            </div>
                        )}

                        {!providersLoading && filteredProviders.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-4xl mb-3">🔍</p>
                                <p className="text-gray-400 text-sm">
                                    {searchQuery ? `"${searchQuery}" পাওয়া যায়নি` : "কোনো প্রোভাইডার নেই"}
                                </p>
                            </div>
                        )}

                        {!providersLoading && filteredProviders.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {filteredProviders.map((provider) => (
                                    <ProviderCard key={provider._id} provider={provider} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>


            {/* ══════════════════════════════════════════
          DESKTOP LAYOUT  (1024px+)
      ══════════════════════════════════════════ */}
            <div className="hidden lg:block min-h-screen">

                {/* Header */}
                <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
                    <div className="max-w-7xl mx-auto px-10 py-4 flex items-center gap-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition flex-shrink-0"
                        >
                            <FaArrowLeft className="text-gray-700 text-sm" />
                        </button>
                        <div>
                            <h1 className="text-gray-900 font-bold text-lg leading-tight">
                                {serviceTitles[serviceKey] || "প্রোভাইডার"} খুঁজুন
                            </h1>
                            {customerParentArea && !providersLoading && (
                                <p className="text-gray-400 text-xs">
                                    {customerParentArea} এলাকায় {filteredProviders.length} জন পাওয়া গেছে
                                </p>
                            )}
                        </div>
                        <div className="flex-1" />
                        {/* Search */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200 w-96">
                            <FaSearch className="text-gray-400 text-sm flex-shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="নাম দিয়ে প্রোভাইডার খুঁজুন..."
                                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")}>
                                    <FaTimes className="text-gray-400 text-sm hover:text-gray-600 transition" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body: sidebar + grid */}
                <div className="max-w-7xl mx-auto px-10 py-8 flex gap-8">

                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
                            <h3 className="text-gray-800 font-bold text-sm mb-4">ফিল্টার ও সাজান</h3>
                            <FiltersPanel />
                        </div>
                    </aside>

                    {/* Grid (3-col) */}
                    <main className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-gray-800 font-bold text-base">
                                অন্যান্য প্রোভাইডার
                            </p>
                            {!providersLoading && (
                                <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">
                                    {filteredProviders.length} জন পাওয়া গেছে
                                </span>
                            )}
                        </div>

                        {providersLoading && (
                            <div className="grid grid-cols-3 gap-5">
                                {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
                            </div>
                        )}

                        {!providersLoading && filteredProviders.length === 0 && (
                            <div className="text-center py-24">
                                <p className="text-5xl mb-4">🔍</p>
                                <p className="text-gray-500 font-medium text-sm mb-1">
                                    {searchQuery ? `"${searchQuery}" নামে কোনো প্রোভাইডার পাওয়া যায়নি` : "কোনো প্রোভাইডার পাওয়া যায়নি"}
                                </p>
                                <p className="text-gray-400 text-xs">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
                                {(experienceFilter !== "all" || sortBy !== "rating" || searchQuery) && (
                                    <button
                                        onClick={() => { setExperienceFilter("all"); setSortBy("rating"); setSearchQuery(""); }}
                                        className="mt-4 px-5 py-2 bg-[#4169E1] text-white text-sm rounded-xl font-medium hover:bg-blue-700 transition"
                                    >
                                        সব ফিল্টার সরান
                                    </button>
                                )}
                            </div>
                        )}

                        {!providersLoading && filteredProviders.length > 0 && (
                            <div className="grid grid-cols-3 gap-5">
                                {filteredProviders.map((provider) => (
                                    <ProviderCard key={provider._id} provider={provider} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ServiceList;