import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./RootLayout";
import axios from "axios";
import { Outlet, useLocation } from "react-router";
import ProviderBottomNav from "../pages/ProviderNav/ProviderBottomNav";

export const ProviderContext = createContext();

const ProviderLayout = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [provider, setProvider] = useState(null);
    const [checkingProvider, setCheckingProvider] = useState(true);
    const providerExists = !!provider;

    const [providerData, setProviderData] = useState({
        name: "",
        service: "",
        experience: "",
        locationParent: "",
        locationSub: "",
        areaOnly: false,
        contact: { phone: true, whatsapp: true },
    });
    const HIDE_BOTTOM_NAV_ROUTES = [
        "/dokkho/login",
        "/dokkho/verify-otp",
        "/dokkho/role",
        "/dokkho/provider/onboarding",
    ]
    const shouldHideBottomNav = HIDE_BOTTOM_NAV_ROUTES.includes(
        location.pathname
    )

    const fetchProvider = async () => {
        if (!user?.uid) {
            setProvider(null);
            setCheckingProvider(false);
            return;
        }

        setCheckingProvider(true);
        try {
            const res = await axios.get(
                `https://dokkoh-server.vercel.app/providers/by-uid/${user.uid}`
            );
            setProvider(res.data.exists ? res.data.provider : null);
        } catch (err) {
            console.error("Fetch provider failed", err);
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
            "https://dokkoh-server.vercel.app/providers",
            {
                user: {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    metadata: user.metadata,
                },
                providerData,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        await fetchProvider();
        return res.data
    };

    const toggleProviderAvailability = async () => {
        if (!provider?._id) return;

        const updated = !provider.availability;

        await axios.patch(
            `https://dokkoh-server.vercel.app/providers/${provider._id}/availability`,
            { availability: updated }
        );

        setProvider({ ...provider, availability: updated });
    };

    return (
        <ProviderContext.Provider
            value={{
                provider,
                providerExists,
                checkingProvider,
                providerData,
                setProviderData,
                submitProviderOnboarding,
                toggleProviderAvailability,
                refetchProvider: fetchProvider,
            }}
        >
            <div className={!shouldHideBottomNav ? "pb-20" : ""}>
                <Outlet />
            </div>

            {/* Mobile Bottom Navigation */}
            {!shouldHideBottomNav && <ProviderBottomNav />}

        </ProviderContext.Provider>
    );
};

export default ProviderLayout;
