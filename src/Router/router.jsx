import { createBrowserRouter } from "react-router";
import RootLayout from '../Layout/RootLayout'
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import Home from "../pages/Home/Home";
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";
import RoleSelect from "../pages/UserRole/RoleSelect";
import ProviderOnboarding from "../pages/ProviderOnBoarding/ProviderOnboarding";
import ProviderDashboard from "../pages/ProviderDashboard/ProviderDashboard ";
import ProviderProfile from "../pages/ProviderProfile/ProviderProfile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },

            { path: "/dokkho/login", element: <PhoneLogin /> },
            { path: "/dokkho/verify-otp", element: <VerifyOtp /> },
            { path: "/dokkho/role", element: <PrivateRoute><RoleSelect /></PrivateRoute> },

            { path: "/dokkho/provider/onboarding", element: <PrivateRoute><ProviderOnboarding /></PrivateRoute> },
            { path: "/dokkho/provider/dashboard", element: <PrivateRoute><ProviderDashboard /></PrivateRoute> },
            { path: "/dokkho/provider/profile", element: <PrivateRoute><ProviderProfile /></PrivateRoute> }
        ],
    },
]);
export default router
