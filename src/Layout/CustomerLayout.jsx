import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./RootLayout";
import axios from "axios";
import { Outlet,useLocation } from "react-router";
import CustomerBottomNav from "../pages/CustomerNav/CustomerBottomNav";

export const CustomerContext = createContext();

const CustomerLayout = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    /* ================= CUSTOMER LOCATION ================= */
    const [customerParentArea, setCustomerParentArea] = useState(
        () => localStorage.getItem("customerParentArea")
    );

    useEffect(() => {
        if (customerParentArea) {
            localStorage.setItem("customerParentArea", customerParentArea);
        } else {
            localStorage.removeItem("customerParentArea");
        }
    }, [customerParentArea]);

    /* ================= PROVIDERS LIST (CUSTOMER ONLY) ================= */
    const [providers, setProviders] = useState([]);
    const [providersLoading, setProvidersLoading] = useState(false);
    const HIDE_BOTTOM_NAV_ROUTES = [
        "/dokkho/login",
        "/dokkho/verify-otp",
        "/dokkho/role",
        "/dokkho/provider/onboarding",
    ];
    const shouldHideBottomNav = HIDE_BOTTOM_NAV_ROUTES.includes(
        location.pathname
    );
    const fetchProviders = async ({ serviceKey, locationParent } = {}) => {
        setProvidersLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/providers", {
                params: {
                    service: serviceKey || undefined,
                    locationParent: locationParent || undefined,
                },
            });
            setProviders(res.data || []);
        } catch (err) {
            console.error("Fetch providers failed", err);
            setProviders([]);
        } finally {
            setProvidersLoading(false);
        }
    };

    /* ================= ENSURE CUSTOMER ROLE ================= */
    useEffect(() => {
        if (!user?.uid) return;

        axios.patch(
            `http://localhost:3000/users/${user.uid}/customer-role`,
            { phoneNumber: user.phoneNumber }
        ).catch(err => {
            console.error("Ensure customer role failed", err);
        });
    }, [user]);

    return (
        <CustomerContext.Provider
            value={{
                customerParentArea,
                setCustomerParentArea,
                providers,
                providersLoading,
                fetchProviders,
            }}
        >
            <div className={!shouldHideBottomNav ? "pb-20" : ""}>
                <Outlet />
            </div>

            {/* Mobile Bottom Navigation */}
            {!shouldHideBottomNav && <CustomerBottomNav />}
        </CustomerContext.Provider>
    );
};

export default CustomerLayout;
