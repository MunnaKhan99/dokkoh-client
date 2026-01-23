import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase.config";
import axios from "axios";

export const dokkhoContext = createContext();

const RootLayout = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [role, setRole] = useState(
        () => localStorage.getItem("dokkho_role") || null
    );

    const [provider, setProvider] = useState(null);
    const [checkingProvider, setCheckingProvider] = useState(true);

    const providerExists = !!provider;

    const [providerData, setProviderData] = useState({
        name: "",
        service: "",
        experience: "",
        location: "",
        areaOnly: false,
        contact: { phone: true, whatsapp: true },
    });
    const [providers, setProviders] = useState([]);
    const [providersLoading, setProvidersLoading] = useState(false);


    // OTP verify = customer
    const ensureCustomerRole = async (firebaseUser) => {
        if (!firebaseUser?.uid) return;
        await axios.patch(
            `http://localhost:3000/users/${firebaseUser.uid}/customer-role`,
            {
                phoneNumber: firebaseUser.phoneNumber,
            }
        );
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                await ensureCustomerRole(currentUser);
            } else {
                setProvider(null);
                setCheckingProvider(false);
            }
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (role) localStorage.setItem("dokkho_role", role);
    }, [role]);
    
    const fetchProviders = async ({ serviceKey } = {}) => {
        setProvidersLoading(true);

        try {
            const res = await axios.get("http://localhost:3000/providers", {
                params: {
                    service: serviceKey || undefined,
                },
            });

            setProviders(res.data || []);
        } catch (error) {
            console.error("Failed to fetch providers", error);
            setProviders([]);
        } finally {
            setProvidersLoading(false);
        }
    };

    const fetchProvider = async () => {
        setCheckingProvider(true);

        if (!user?.uid) {
            setProvider(null);
            setCheckingProvider(false);
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:3000/providers/by-uid/${user.uid}`
            );

            if (res.data.exists) {
                setProvider(res.data.provider);
            } else {
                setProvider(null);
            }
        } catch (error) {
            console.error("Unexpected provider fetch error", error);
            setProvider(null);
        } finally {
            setCheckingProvider(false);
        }
    };


    useEffect(() => {
        fetchProvider();
    }, [user]);

    const submitProviderOnboarding = async () => {
        const token = await user.getIdToken();
        const res = await axios.post(
            "http://localhost:3000/providers",
            {
                user: {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    metadata: user.metadata,
                    reloadUserInfo: user.reloadUserInfo,
                },
                providerData,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        await fetchProvider();
        return res.data;
    };

    const toggleProviderAvailability = async () => {
        const updated = !provider.availability;
        await axios.patch(
            `http://localhost:3000/providers/${provider._id}/availability`,
            { availability: updated }
        );
        setProvider({ ...provider, availability: updated });
    };

    const logout = async () => {
        await signOut(auth);
        await axios.post("http://localhost:3000/logout");
        setUser(null);
        setProvider(null);
        navigate("/dokkho/login", { replace: true });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <dokkhoContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                role,
                setRole,
                provider,
                providers,
                providersLoading,
                fetchProviders,
                providerExists,
                checkingProvider,
                providerData,
                setProviderData,
                submitProviderOnboarding,
                toggleProviderAvailability,
                logout,
            }}
        >
            <Outlet />
        </dokkhoContext.Provider>
    );
};

export default RootLayout;