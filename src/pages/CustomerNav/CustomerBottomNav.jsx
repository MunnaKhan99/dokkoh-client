import { NavLink } from "react-router";
import { FaBriefcase, FaHome, FaSearch, FaUser } from "react-icons/fa";

const CustomerBottomNav = () => {
    const navItem = ({ isActive }) =>
        `flex flex-col items-center gap-1 text-[10px] font-bold transition
        ${isActive ? "text-[#4169E1]" : "text-gray-400"}`;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md md:hidden">
            <div className="flex justify-around items-center h-16">
                <NavLink to="/dokkho/customer/dashboard" className={navItem}>
                    <FaHome size={20} />
                    হোম
                </NavLink>

                <NavLink to="/dokkho/customer/services/electrician" className={navItem}>
                    <FaSearch size={20} />
                    সার্ভিস
                </NavLink>
                <NavLink to="/dokkho/provider/dashboard" className={navItem}>
                    <FaBriefcase size={20} />
                    প্রোভাইডার
                </NavLink>

                <NavLink to="/dokkho/customer/profile" className={navItem}>
                    <FaUser size={20} />
                    প্রোফাইল
                </NavLink>
            </div>
        </nav>
    );
};

export default CustomerBottomNav;
