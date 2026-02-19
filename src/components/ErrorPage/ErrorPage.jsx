// src/components/ErrorPage/ErrorPage.jsx

import { useContext } from "react";
import { useNavigate, useRouteError } from "react-router";
import { AuthContext } from "../../Layout/RootLayout";

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const handleBackToDashboard = () => {
        if (!user) return navigate("/dokkho/login");

        const role = user?.role; // adjust based on your auth structure
        if (role === "provider") {
            navigate("/dokkho/provider/dashboard");
        } else {
            navigate("/dokkho/customer/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            {/* Status Code */}
            <h1 className="text-8xl font-extrabold text-indigo-500">
                {error?.status || "404"}
            </h1>

            {/* Title */}
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {error?.status === 401
                    ? "অ্যাক্সেস অনুমোদিত নয়"
                    : error?.status === 403
                        ? "প্রবেশাধিকার নেই"
                        : error?.status === 500
                            ? "সার্ভারে সমস্যা হয়েছে"
                            : "পেজটি খুঁজে পাওয়া যায়নি"}
            </h2>

            {/* Description */}
            <p className="mt-2 text-gray-500 max-w-md">
                {error?.statusText ||
                    error?.message ||
                    "আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে বা অস্থায়ীভাবে অনুপলব্ধ।"}
            </p>

            {/* Error detail (dev only) */}
            {import.meta.env.DEV && error?.stack && (
                <pre className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600 text-left max-w-lg overflow-auto">
                    {error.stack}
                </pre>
            )}

            {/* Actions */}
            <div className="mt-8 flex gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition text-sm font-medium"
                >
                    ← পেছনে যান
                </button>
                <button
                    onClick={handleBackToDashboard}
                    className="px-5 py-2.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition text-sm font-medium"
                >
                    ড্যাশবোর্ডে যান
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;