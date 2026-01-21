import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase.config";

export const dokkhoContext = createContext();

const RootLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 👤 App role (persisted)
    const [role, setRole] = useState(
        () => localStorage.getItem("dokkho_role") || null
    );

    // 🧩 Provider onboarding data
    const [providerData, setProviderData] = useState({
        name:"",
        service: "",
        location: "",
        areaOnly: false,
        contact: {
            phone: true,
            whatsapp: true,
        },
    });

    // 🔄 Firebase auth observer (ONLY auth, no redirect)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Persist role
    useEffect(() => {
        if (role) {
            localStorage.setItem("dokkho_role", role);
        }
    }, [role]);

    const contextValue = {
        user,
        setUser,
        role,
        setRole,
        providerData,
        setProviderData,
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
