import { createBrowserRouter } from "react-router";

import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import Home from '../pages/Home/Home'
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";
import RoleSelect from "../pages/UserRole/RoleSelect";
import CustomerLayout from "../Layout/CustomerLayout";
import CustomerDashboard from "../pages/CustomerProfile/CustomerDashborad";
import CustomerProfile from "../pages/CustomerProfile/CustomerProfile";
import ServiceList from "../pages/CustomerProfile/ServiceList";
import ProviderLayout from "../Layout/ProviderLayout";
import ProviderOnboarding from "../pages/ProviderOnBoarding/ProviderOnboarding";
import ProviderDashboard from "../pages/ProviderDashboard/ProviderDashboard ";
import ProviderProfile from "../pages/ProviderProfile/ProviderProfile";
import ProviderDetails from "../pages/ProviderDetails/ProviderDetails";
import RootLayout from "../Layout/RootLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },

            { path: "/dokkho/login", element: <PhoneLogin /> },
            { path: "/dokkho/verify-otp", element: <VerifyOtp /> },
            {
                path: "/dokkho/role",
                element: (
                    <PrivateRoute>
                        <RoleSelect />
                    </PrivateRoute>
                ),
            },

            /* ================= CUSTOMER ================= */
            {
                path: "/dokkho/customer",
                element: (
                    <PrivateRoute>
                        <CustomerLayout />
                    </PrivateRoute>
                ),
                children: [
                    { path: "dashboard", element: <CustomerDashboard /> },
                    { path: "profile", element: <CustomerProfile /> },
                    { path: "services/:serviceKey", element: <ServiceList /> },
                ],
            },

            /* ================= PROVIDER ================= */
            {
                path: "/dokkho/provider",
                element: (
                    <PrivateRoute>
                        <ProviderLayout />
                    </PrivateRoute>
                ),
                children: [
                    { path: "onboarding", element: <ProviderOnboarding /> },
                    { path: "dashboard", element: <ProviderDashboard /> },
                    { path: "profile", element: <ProviderProfile /> },
                ],
            },

            /* provider public profile */
            {
                path: "/dokkho/provider/:providerId",
                element: (
                    <PrivateRoute>
                        <ProviderDetails />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default router;
