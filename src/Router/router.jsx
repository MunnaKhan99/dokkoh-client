import { createBrowserRouter } from "react-router";
import RootLayout from '../Layout/RootLayout'
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import Home from "../pages/Home/Home";
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";
import RoleSelect from "../pages/UserRole/RoleSelect";
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },

            { path: "/dokkho/login", element: <PhoneLogin /> },
            { path: "/dokkho/verify-otp", element: <VerifyOtp /> },
            { path: "/dokkho/role", element: <RoleSelect /> },
        ],
    },
]);
export default router
