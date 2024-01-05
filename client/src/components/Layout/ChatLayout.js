import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getChats} from "../../api/chat";
import {Link, Outlet} from "react-router-dom";
import {PathConstants} from "../../constants/PathConstants";

const Chats = () => {
    const { chats } = useSelector((s) => s.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChats());
    }, [dispatch]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-60 bg-white shadow-lg overflow-y-auto">
                <div className="p-4 font-bold text-lg border-b">Messages</div>
                {chats && chats.map((chat, index) => (
                    <Link to={PathConstants.CHAT.replace(':id', chat._id)} key={index} className="p-4 flex items-center space-x-3 border-b hover:bg-gray-100 cursor-pointer">
                        <img alt='avatar' src={chat.users[0].avatar} className="rounded-full bg-gray-300 w-12 h-12" />
                        <div>
                            <div className="font-semibold">{chat.users[0].name}</div>
                            {/*<div className="text-sm text-gray-500">{contact.status}</div>*/}
                        </div>
                    </Link>
                ))}
            </div>
            {/* Chat area */}
            <Outlet />
        </div>
    );
};

export default Chats;
