import { NavLink } from "react-router";
import {
    FaHome,
    FaBriefcase,
    FaUser,
} from "react-icons/fa";

const ProviderBottomNav = () => {
    const navItem = ({ isActive }) =>
        `flex flex-col items-center gap-1 text-[10px] font-bold transition
        ${isActive ? "text-[#4169E1]" : "text-gray-400"}`;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md md:hidden">
            <div className="flex justify-around items-center h-16">
                <NavLink to="/dokkho/provider/dashboard" className={navItem}>
                    <FaHome size={20} />
                    ড্যাশবোর্ড
                </NavLink>

                <NavLink to="/dokkho/provider/profile" className={navItem}>
                    <FaUser size={20} />
                    প্রোফাইল
                </NavLink>

                <NavLink to="/dokkho/customer/dashboard" className={navItem}>
                    <FaBriefcase size={20} />
                    কাস্টমার
                </NavLink>
            </div>
        </nav>
    );
};

export default ProviderBottomNav;
