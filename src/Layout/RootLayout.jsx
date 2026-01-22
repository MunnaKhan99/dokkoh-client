import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase.config";
import axios from "axios";
import Swal from "sweetalert2";

export const dokkhoContext = createContext();

const RootLayout = () => {
    const navigate = useNavigate();

    /* ---------------- Auth ---------------- */
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ---------------- Role ---------------- */
    const [role, setRole] = useState(
        () => localStorage.getItem("dokkho_role") || null
    );

    /* ---------------- Provider Core State ---------------- */
    const [provider, setProvider] = useState(null);
    const [providerLoading, setProviderLoading] = useState(true);

    const providerExists = !!provider;

    /* ---------------- Provider Onboarding Draft ---------------- */
    const [providerData, setProviderData] = useState({
        name: "",
        service: "",
        location: "",
        areaOnly: false,
        contact: {
            phone: true,
            whatsapp: true,
        },
    });

    /* ---------------- Firebase Auth Observer ---------------- */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /* ---------------- Persist Role ---------------- */
    useEffect(() => {
        if (role) {
            localStorage.setItem("dokkho_role", role);
        }
    }, [role]);

    /* ---------------- Fetch Provider (SINGLE SOURCE) ---------------- */
    const fetchProvider = async () => {
        if (!user?.uid) {
            setProvider(null);
            setProviderLoading(false);
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:3000/providers/by-uid/${user.uid}`
            );
            setProvider(res.data);
        } catch (error) {
            if (error.response?.status === 404) {
                setProvider(null);
            } else {
                console.error("Fetch provider failed", error);
            }
        } finally {
            setProviderLoading(false);
        }
    };

    useEffect(() => {
        setProviderLoading(true);
        fetchProvider();
    }, [user]);

    /* ---------------- Provider Onboarding Submit ---------------- */
    const submitProviderOnboarding = async () => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "লগইন নেই",
                text: "অনুগ্রহ করে আগে লগইন করুন",
            });
            return { success: false };
        }

        try {
            const token = await user.getIdToken();

            const payload = {
                user: {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    metadata: user.metadata,
                    reloadUserInfo: user.reloadUserInfo,
                },
                providerData,
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

            // refresh provider globally
            await fetchProvider();

            return res.data;
        } catch (error) {
            console.error("Provider setup failed:", error);

            Swal.fire({
                icon: "error",
                title: "সার্ভার সমস্যা",
                text: "সেটআপ সম্পন্ন করা যায়নি, আবার চেষ্টা করুন",
            });

            return { success: false };
        }
    };

    /* ---------------- Availability Toggle ---------------- */
    const toggleProviderAvailability = async () => {
        if (!provider?._id) return;

        try {
            const updated = !provider.availability;

            await axios.patch(
                `http://localhost:3000/providers/${provider._id}/availability`,
                { availability: updated }
            );

            setProvider({
                ...provider,
                availability: updated,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "আপডেট ব্যর্থ",
                text: "অ্যাভেইলেবিলিটি পরিবর্তন করা যায়নি",
            });
        }
    };

    /* ---------------- Logout ---------------- */
    const logout = async () => {
        try {
            await signOut(auth);
            await axios.post("http://localhost:3000/logout");

            setUser(null);
            setProvider(null);

            Swal.fire({
                icon: "success",
                title: "লগআউট সফল",
                timer: 1200,
                showConfirmButton: false,
            });

            navigate("/dokkho/login", { replace: true });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "লগআউট ব্যর্থ",
                text: error.message,
            });
        }
    };

    /* ---------------- Context ---------------- */
    const contextValue = {
        user,
        setUser,

        role,
        setRole,

        loading,
        setLoading,

        provider,
        providerExists,
        providerLoading,

        providerData,
        setProviderData,

        fetchProvider,
        submitProviderOnboarding,
        toggleProviderAvailability,

        logout,
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <dokkhoContext.Provider value={contextValue}>
            <Outlet />
        </dokkhoContext.Provider>
    );
};

export default RootLayout;
