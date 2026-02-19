import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import auth from "../firebase.config";
import axios from "axios";
import Swal from "sweetalert2"; // SweetAlert Import

export const AuthContext = createContext();

const RootLayout = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(() => localStorage.getItem("dokkho_role") || null);

    useEffect(() => {
        if (role) {
            localStorage.setItem("dokkho_role", role);
        } else {
            localStorage.removeItem("dokkho_role");
        }
    }, [role]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const firebaseToken = await currentUser.getIdToken();
                    await axios.post(
                        "https://dokkohserver.vercel.app/jwt",
                        {},
                        {
                            headers: { Authorization: `Bearer ${firebaseToken}` },
                            withCredentials: true,
                        }
                    );
                } catch (err) {
                    console.error("JWT setting failed", err);
                    Swal.fire({
                        icon: "error",
                        title: "সেশন এরর",
                        text: "আপনার সেশনটি সুরক্ষিত করা যায়নি। আবার চেষ্টা করুন।",
                        confirmButtonColor: "#f43f5e",
                    });
                }
            } else {
                try {
                    await axios.post("https://dokkohserver.vercel.app/logout", {}, { withCredentials: true });
                } catch (err) {
                    console.error("Logout failed", err);
                }
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const logout = async () => {
        // Logout Confirmation
        const result = await Swal.fire({
            title: "লগআউট করতে চান?",
            text: "আপনার অ্যাকাউন্ট থেকে লগআউট করা হবে।",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f43f5e",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "হ্যাঁ, লগআউট করুন",
            cancelButtonText: "না"
        });

        if (result.isConfirmed) {
            await signOut(auth);
            await axios.post(`https://dokkohserver.vercel.app/logout`);
            setUser(null);
            setRole(null);

            Swal.fire({
                icon: "success",
                title: "সফল!",
                text: "আপনি সফলভাবে লগআউট হয়েছেন।",
                showConfirmButton: false,
                timer: 1500
            });

            navigate("/dokkho/login", { replace: true });
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, setUser, role, setRole, loading, logout }}>
            <Outlet />
        </AuthContext.Provider>
    );
};

export default RootLayout;