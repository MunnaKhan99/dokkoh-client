import { useState, useContext } from "react";
import {
    FaBolt,
    FaTools,
    FaBook,
    FaBriefcase,
    FaPhoneAlt,
    FaWhatsapp,
} from "react-icons/fa";
import { dokkhoContext } from "../../Layout/RootLayout";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ProviderOnboarding = () => {
    const { providerData, setProviderData, user } = useContext(dokkhoContext);
    const [step, setStep] = useState(1);
    const navigate = useNavigate()

    /* ---------- Step Navigation ---------- */
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    /* ---------- STEP 1: Service ---------- */
    const services = [
        { id: "electrician", label: "ইলেকট্রিশিয়ান", icon: <FaBolt /> },
        { id: "plumber", label: "প্লাম্বার", icon: <FaTools /> },
        { id: "tutor", label: "হোম টিউটর", icon: <FaBook /> },
        { id: "other", label: "অন্যান্য", icon: <FaBriefcase /> },
    ];

    /* ---------- STEP 2: Location ---------- */
    const areas = ["Dhanmondi", "Mirpur", "Uttara", "Mohammadpur"];

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
        try {
            if (!user) {
                Swal.fire({
                    icon: "error",
                    title: "লগইন নেই",
                    text: "অনুগ্রহ করে আগে লগইন করুন",
                });
                return;
            }

            const token = await user.getIdToken();

            const payload = {
                user: {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    metadata: user.metadata,
                    reloadUserInfo: user.reloadUserInfo,
                },
                providerData: {
                    name: providerData.name,
                    service: providerData.service,
                    location: providerData.location,
                    areaOnly: providerData.areaOnly,
                    contact: providerData.contact,
                },
            };

            const res = await axios.post(
                "http://localhost:3000/providers",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            /* ---------------- SweetAlert Logic ---------------- */

            if (res.data?.success && res.data?.message === "Provider already exists") {
                Swal.fire({
                    icon: "info",
                    title: "আপনি ইতিমধ্যে রেজিস্টার্ড",
                    text: "আপনার প্রোভাইডার প্রোফাইল আগেই তৈরি করা আছে",
                    confirmButtonText: "ঠিক আছে",
                });
                setTimeout(() => {
                    navigate("/dokkho/provider/dashboard");
                }, 1500);
            }
            else if (res.data?.success && res.data?.providerId) {
                Swal.fire({
                    icon: "success",
                    title: "সফলভাবে সম্পন্ন হয়েছে",
                    text: "আপনার প্রোভাইডার প্রোফাইল তৈরি হয়েছে",
                    confirmButtonText: "ড্যাশবোর্ডে যান",


                }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            navigate("/dokkho/provider/dashboard");
                        }, 1500);
                    }
                });
            }
            else {
                Swal.fire({
                    icon: "warning",
                    title: "অপ্রত্যাশিত উত্তর",
                    text: "কিছু একটা সমস্যা হয়েছে",
                });
            }

        } catch (error) {
            console.error("Provider setup failed:", error);

            Swal.fire({
                icon: "error",
                title: "সার্ভার সমস্যা",
                text: "সেটআপ সম্পন্ন করা যায়নি, আবার চেষ্টা করুন",
            });
        }
    };


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

                        <button
                            disabled={!providerData.service || !providerData.name}
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

                        <select
                            className="w-full border rounded-xl p-4 mb-4"
                            value={providerData.location}
                            onChange={(e) =>
                                setProviderData({
                                    ...providerData,
                                    location: e.target.value,
                                })
                            }
                        >
                            <option value="">Select area</option>
                            {areas.map((area) => (
                                <option key={area}>{area}</option>
                            ))}
                        </select>

                        <label className="flex items-center gap-2 mb-8">
                            <input
                                type="checkbox"
                                checked={providerData.areaOnly}
                                onChange={(e) =>
                                    setProviderData({
                                        ...providerData,
                                        areaOnly: e.target.checked,
                                    })
                                }
                            />
                            আমি শুধু এই এলাকাতেই কাজ করি
                        </label>

                        <div className="flex gap-4">
                            <button
                                onClick={prevStep}
                                className="w-1/2 border py-4 rounded-xl"
                            >
                                পেছনে
                            </button>
                            <button
                                disabled={!providerData.location}
                                onClick={nextStep}
                                className="w-1/2 bg-green-500 text-white py-4 rounded-xl disabled:opacity-50"
                            >
                                এগিয়ে যান
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
