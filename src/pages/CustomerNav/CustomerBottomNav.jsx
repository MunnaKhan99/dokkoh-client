import { NavLink } from "react-router";
import { FaHome, FaHeart, FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

const CustomerBottomNav = () => {
    const navItem = ({ isActive }) =>
        `flex flex-col items-center gap-1 text-[10px] font-bold transition-colors
        ${isActive ? "text-[#4169E1]" : "text-gray-400"}`;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-lg md:hidden">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
                <NavLink to="/dokkho/customer/dashboard" className={navItem}>
                    <FaHome size={20} />
                    হোম
                </NavLink>

                <NavLink to="/dokkho/customer/services/electrician" className={navItem}>
                    <IoSearchOutline size={22} />
                    সার্ভিস
                </NavLink>

                {/* প্রিয় — further implementation */}
                <NavLink to="/dokkho/customer/favorites" className={navItem}>
                    <FaHeart size={20} />
                    প্রিয়
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