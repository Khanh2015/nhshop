import { Link, NavLink } from "react-router-dom";
import { CartIcon, SearchIcon, UserIcon, WishlistIcon } from "./icons";
import Logo from "/logo.png";
const Header = () => {
    return (
        <header className="flex justify-between items-center px-[90px] py-[20px] sticky top-0 left-0 right-0 z-10 bg-white shadow-lg">
            <div className="">
                <Link to="/" className="flex items-center">
                    <img src={Logo} alt="" className="w-[50px]" />
                    <span className="text-[34px] font-bold ">Furniro</span>
                </Link>
            </div>

            <nav className="">
                <ul className="flex items-center gap-9">
                    <li className="">
                        <NavLink
                            to="/"
                            className="text-[18px] font-semibold duration-200 hover:text-red-500"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="/shop"
                            className="text-[18px] font-semibold duration-200 hover:text-red-500"
                        >
                            Shop
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="/about"
                            className="text-[18px] font-semibold duration-200 hover:text-red-500"
                        >
                            About
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            to="/contact"
                            className="text-[18px] font-semibold duration-200 hover:text-red-500"
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="flex items-center gap-10">
                <NavLink to="/signin" className="">
                    <img src={UserIcon} alt="" className="w-[20px]" />
                </NavLink>
                <div className="">
                    <img src={SearchIcon} alt="" className="w-[20px]" />
                </div>
                <div className="">
                    <img src={WishlistIcon} alt="" className="w-[20px]" />
                </div>
                <NavLink to="/cart" className="">
                    <img src={CartIcon} alt="" className="w-[20px]" />
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
