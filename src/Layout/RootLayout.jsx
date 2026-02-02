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
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
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
