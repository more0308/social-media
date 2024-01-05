import React, {useState} from 'react';
import {
    FaBars,
    FaEnvelope,
    FaHeart,
    FaHome,
    FaPlusSquare,
    FaRegCircle,
    FaSearch,
    FaUserCircle,
    FaArrowAltCircleDown
} from "react-icons/fa";
import NavItem from "./NavItem";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../api/user";
import {PathConstants} from "../../../constants/PathConstants";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((s) => s.user);

    const [isOpen, setIsOpen] = useState(true);
    const togglePanel = () => setIsOpen(!isOpen);

    const navItems = [
        { Icon: FaHome, text: 'Home', link: PathConstants.HOME },
        { Icon: FaSearch, text: 'Search', link: PathConstants.USER_SEARCH },
        { Icon: FaEnvelope, text: 'Messages', link: PathConstants.CHATS },
        { Icon: FaPlusSquare, text: 'Create post', link: PathConstants.CREATE_POST },
        { Icon: FaUserCircle, text: 'Profile', link: PathConstants.PROFILE.replace(':login', user?.login) }
    ];

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <div className={`fixed flex-col bg-gray-900 text-gray-300 transition-all duration-300 ease-in-out h-screen ${isOpen ? 'w-64' : 'w-16'}`}>
            {/* Toggle Button */}
            <button onClick={togglePanel} className="text-white text-2xl p-3 self-end cursor-pointer">
                <FaBars />
            </button>

            {/* Nav Items */}
            <nav className="flex-1 pt-20">
                {navItems.map((item, index) => (
                    <NavItem key={index} Icon={item.Icon} text={item.text} isOpen={isOpen} link={item.link} />
                ))}
            </nav>

            <div onClick={logoutHandler} className={`flex items-center mt-32 text-sm py-3 hover:bg-gray-700 cursor-pointer  ${isOpen ? 'pl-10' : ''}`}>
                <FaArrowAltCircleDown className={`text-lg ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                {isOpen && <span className="font-medium">Logout</span>}
            </div>
        </div>
    );
};

export default Navbar;