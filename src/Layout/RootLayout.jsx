import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import auth from "../firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const RootLayout = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔑 GLOBAL ROLE (customer / provider)
    const [role, setRole] = useState(
        () => localStorage.getItem("dokkho_role") || null
    );

    // persist role
    useEffect(() => {
        if (role) {
            localStorage.setItem("dokkho_role", role);
        } else {
            localStorage.removeItem("dokkho_role");
        }
    }, [role]);

    // firebase auth listener
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    // 🔐 1. Firebase ID token নাও
                    const firebaseToken = await currentUser.getIdToken();

                    // 🔐 2. Backend এ পাঠাও verification এর জন্য
                    await axios.post(
                        "https://dokkoh-server.vercel.app/jwt",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${firebaseToken}`,
                            },
                            withCredentials: true, // httpOnly cookie সেট করার জন্য জরুরি
                        }
                    );

                } catch (err) {
                    console.error("JWT setting failed", err);
                }
            } else {
                try {
                    // 🔓 logout হলে cookie clear
                    await axios.post(
                        "https://dokkoh-server.vercel.app/logout",
                        {},
                        { withCredentials: true }
                    );
                } catch (err) {
                    console.error("Logout failed", err);
                }
            }

            setLoading(false);
        });

        return () => unsub();
    }, []);


    const logout = async () => {
        await signOut(auth);
        await axios.post(`https://dokkoh-server.vercel.app/logout`);
        setUser(null);
        setRole(null);
        navigate("/dokkho/login", { replace: true });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                role,
                setRole,
                loading,
                logout,
            }}
        >
            <Outlet />
        </AuthContext.Provider>
    );
};

export default RootLayout;
