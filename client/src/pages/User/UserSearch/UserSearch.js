import React, {useEffect, useState} from 'react';
import SearchItem from "../../../components/Common/User/Search/SearchItem";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {users as usersRequest} from "../../../api/user";


const UserSearch = () => {
    const { users } = useSelector((s) => s.user);

    const dispatch = useDispatch();

    const { register, watch } = useForm();
    const [timer, setTimer] = useState(null);

    const searchText = watch("login"); // Поле ввода, которое нужно отслеживать

    useEffect(() => {
        if (timer) {
            clearTimeout(timer); // Очищаем предыдущий таймер
        }

        const newTimer = setTimeout(() => {
            // Функция, которая выполнится через 2 секунды после последнего ввода
            sendRequest(searchText);
        }, 1000);

        setTimer(newTimer);

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(newTimer);
    }, [searchText]);

    const sendRequest = (searchValue) => {
        if (searchValue) {
            dispatch(usersRequest(searchValue));
        }
    };

    return (
        <div className="w-full max-w-xs mx-auto bg-white shadow-lg rounded-lg p-4 mt-20">
            <div className="relative">
                <form>
                <input
                    {...register("login", {
                        required: "Login is required",
                    })}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-200"
                    placeholder="Search"
                />
                </form>
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            <div className="mt-4">
                {users && users.map((user, index) => (
                    <SearchItem key={index} {...user} />
                ))}
            </div>
        </div>
    );
};

export default UserSearch;