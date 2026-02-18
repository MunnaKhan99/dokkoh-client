import axios from "axios";
import Swal from "sweetalert2";
import { MdLocationOn } from "react-icons/md";
import { PARENT_AREAS, AREA_PARENT_MAP } from "./constants";
import locationImage from "../../assets/locationImage.jpg"

const Step2Location = ({ providerData, setProviderData, onNext, onPrev }) => {
    const handleAutoLocation = () => {
        if (!navigator.geolocation) return alert("লোকেশন সাপোর্ট নেই।");

        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const { latitude, longitude } = pos.coords;
                const res = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=bn`, {
                    withCredentials: false
                });
                const adr = res.data.address;
                const detectedArea =
                    adr.suburb || adr.neighbourhood || adr.city_district || adr.town || adr.village;

                if (detectedArea) {
                    const detectedSub = adr.suburb || adr.quarter || adr.neighbourhood || adr.city_district;
                    const parentArea = AREA_PARENT_MAP[detectedSub];

                    if (parentArea) {
                        setProviderData({
                            ...providerData,
                            locationParent: parentArea,
                            locationSub: detectedSub,
                        });
                        Swal.fire({
                            icon: "success",
                            title: "লোকেশন সনাক্ত হয়েছে",
                            text: `${detectedSub} (${parentArea})`,
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "এলাকা সনাক্ত হয়নি",
                            text: "দয়া করে ম্যানুয়ালি এলাকা নির্বাচন করুন",
                        });
                    }
                    alert(`সনাক্ত করা এলাকা: ${detectedArea}`);
                }
            } catch (error) {
                alert("লোকেশন খুঁজে পাওয়া যায়নি।");
            }
        });
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">
                আপনি সাধারণত কোথায় কাজ করেন?
            </h2>
            <p className="text-slate-400 text-sm mb-6">
                আপনার কাজের এলাকা নির্বাচন করুন
            </p>
            <div className="flex justify-center">
                <div className="w-full max-w-xs sm:max-w-sm ">
                    <img
                        src={locationImage}
                        alt="Location illustration"
                        className="mx-auto w-full h-auto object-contain rounded-2xl"
                    />
                </div>
            </div>

            {/* Auto Location Button */}
            <button
                onClick={handleAutoLocation}
                className="w-full mb-6 py-4 px-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all font-medium"
            >
                <MdLocationOn className="text-xl" />
                বর্তমান লোকেশন ব্যবহার করুন
            </button>

            {/* Area Dropdown */}
            <select
                value={providerData.locationParent || ""}
                onChange={(e) =>
                    setProviderData({ ...providerData, locationParent: e.target.value })
                }
                className="w-full border border-slate-200 rounded-xl p-4 mb-4 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all text-slate-700"
            >
                <option value="">এরিয়া নির্বাচন করুন</option>
                {PARENT_AREAS.map((area) => (
                    <option key={area.key} value={area.key}>
                        {area.label}
                    </option>
                ))}
            </select>

            {/* Area Only Checkbox */}


            {/* Navigation Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={onPrev}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                    পেছনে
                </button>
                <button
                    onClick={onNext}
                    disabled={!providerData.locationParent}
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-100"
                >
                    এগিয়ে যান
                </button>
            </div>
        </div>
    );
};

export default Step2Location;