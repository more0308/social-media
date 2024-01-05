import React from 'react';
import {Link} from "react-router-dom";

const NavItem = ({ Icon, text, isOpen, link }) => {
    return (
        <Link to={link} className={`flex items-center text-sm py-3 hover:bg-gray-700 cursor-pointer  ${isOpen ? 'pl-10' : ''}`}>
            <Icon className={`text-lg ${isOpen ? 'mr-3' : 'mx-auto'}`} />
            {isOpen && <span className="font-medium">{text}</span>}
        </Link>
    );
};

export default NavItem;