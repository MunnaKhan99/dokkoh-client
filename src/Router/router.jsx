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
import CustomerDashboard from "../pages/CustomerProfile/CustomerDashborad";
import CustomerProfile from "../pages/CustomerProfile/CustomerProfile";
import ServiceList from "../pages/CustomerProfile/ServiceList";
import ProviderDetails from "../pages/ProviderDetails/ProviderDetails";
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
            { path: "/dokkho/provider/profile", element: <PrivateRoute><ProviderProfile /></PrivateRoute> },

            { path: "/dokkho/customer/dashboard", element: <PrivateRoute><CustomerDashboard /></PrivateRoute> },
            { path: "/dokkho/customer/profile", element: <PrivateRoute><CustomerProfile /></PrivateRoute> },
            { path: "/dokkho/customer/services/:serviceKey", element: <PrivateRoute><ServiceList></ServiceList></PrivateRoute> },

            { path: "/dokkho/provider/:providerId", element: <PrivateRoute><ProviderDetails></ProviderDetails></PrivateRoute> }
        ],
    },
]);
export default router
