import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMessages} from "../../api/message";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {createMessage} from "../../api/message";
import {socketClient} from "../../utils/socketInstance";
import {EVENTS} from "../../constants/SocketEvents";
import {userActions} from "../../store/user.slice";
const Chat = () => {
    const {id} = useParams();

    const [userIsWrite, setUserIsWrite] = useState(false);

    const { chat, user } = useSelector((s) => s.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessages(id));
    }, [dispatch, id]);

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = async (data) => {
        data.chat = id;
        const message = await dispatch(createMessage(data));
        socketClient.emit(EVENTS.sendMessage, { chatId: id, message: message.payload.message });
        socketClient.emit(EVENTS.startedWriting, { chatId: id, isWrite: false });
        reset();
    }


    useEffect(() => {
        socketClient.emit(EVENTS.joinChat, id);
    }, [id]);

    useEffect(() => {
        const handleNewMessage = (message) => {
            dispatch(userActions.newMessage({message}));
        };

        socketClient.on(EVENTS.newMessage, handleNewMessage);
        socketClient.on(EVENTS.startedWriting, (isWrite)=> {
            setUserIsWrite(isWrite)
        });

        return () => {
            socketClient.off(EVENTS.newMessage, handleNewMessage);
        };
    }, [dispatch]);

    const writeHandler = (e) => {
        if (e.target.value === '') {
            socketClient.emit(EVENTS.startedWriting, { chatId: id, isWrite: false });
        }
        else {
            socketClient.emit(EVENTS.startedWriting, { chatId: id, isWrite: true });
        }
    }
    return (
        <div className="flex-1 flex flex-col bg-gray-100">
            {/* Chat header */}
            <div className="p-4 font-bold text-lg border-b flex-none">
                Chat with <span className="text-blue-500">Max</span>
            </div>
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4">
                {chat && chat.map((message, index) => (
                    <div
                        key={index}
                        className={`max-w-lg p-2 rounded mb-2 ${
                            message.sender === user._id ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black'
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            {/* Message input */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {userIsWrite && <p className="text-gray-700 p-4">The user is typing a message...</p>}

                <div className="p-4 flex-none flex items-center">

                    <input
                        {...register("text", {
                            required: "Text is required",
                        })}
                        type="text"
                        placeholder="Type a message..."
                        onChange={writeHandler}
                        className="w-full p-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="ml-2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Chat;
