import React from 'react';
import {Link} from "react-router-dom";
import {PathConstants} from "../../../../constants/PathConstants";

const SearchItem = ({ name, login, avatar }) => {
    return (
        <Link to={PathConstants.PROFILE.replace(':login', login)} className="flex items-center space-x-4 py-2">
            <div className="relative">
                <img className="w-12 h-12 rounded-full" src={avatar} alt={login} />
            </div>
            <div>
                <p className="font-bold">{name}</p>
                <p className="text-gray-500">@{login}</p>
            </div>
        </Link>
    );
};

export default SearchItem;