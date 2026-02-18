import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Step1Service from "./Step1service";
import Step2Location from "./Step2location";
import Step3Contact from "./Step3contact";
import ProgressBar from "./Progressbar";
import { ProviderContext } from "../../Layout/ProviderLayout";
import Step4Pricing from "./Step4Pricing";
import Step5Verification from "./Step5Verification";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";



const ProviderOnboarding = () => {
    const { providerData, setProviderData, submitProviderOnboarding } =
        useContext(ProviderContext);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

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
        } else if (result.providerId) {
            Swal.fire({
                icon: "success",
                title: "সফলভাবে সম্পন্ন হয়েছে",
                text: "আপনার প্রোভাইডার প্রোফাইল তৈরি হয়েছে",
            });
        }
        navigate("/dokkho/provider/dashboard");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-100 p-8">
                <ProgressBar step={step} />

                {step === 1 && (
                    <Step1Service
                        providerData={providerData}
                        setProviderData={setProviderData}
                        onNext={nextStep}
                    />
                )}

                {step === 2 && (
                    <Step2Location
                        providerData={providerData}
                        setProviderData={setProviderData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}

                {step === 3 && (
                    <Step3Contact
                        providerData={providerData}
                        setProviderData={setProviderData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}

                {step === 4 && (
                    <Step4Pricing
                        providerData={providerData}
                        setProviderData={setProviderData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}

                {step === 5 && (
                    <Step5Verification
                        providerData={providerData}
                        setProviderData={setProviderData}
                        onPrev={prevStep}
                        onComplete={handleComplete}
                        uploadToCloudinary={uploadToCloudinary}
                    />
                )}
            </div>
        </div>
    );
};

export default ProviderOnboarding;