import { useContext } from "react";
import { AuthContext } from "../Layout/RootLayout";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Firebase auth resolve হওয়া পর্যন্ত অপেক্ষা
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>লোড হচ্ছে...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/dokkho/login" replace />;
    }

    return children;
};

export default PrivateRoute;
