import React from 'react';

import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {login as loginRequest} from "../../../api/user";

const Login = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = (data) => {
        dispatch(loginRequest(data));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                <div className="flex items-center border rounded-lg">
                    <span className="fas fa-user text-gray-400 ml-3"></span>
                    <input
                        {...register('email', {
                            required: 'Required field'
                        })}
                        type="email"
                        id="email"
                        placeholder="Type your email"
                        className="py-2 px-4 block w-full outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                <div className="flex items-center border rounded-lg">
                    <span className="fas fa-lock text-gray-400 ml-3"></span>
                    <input
                        {...register('password', {
                            required: 'Required field'
                        })}
                        type="password"
                        id="password"
                        placeholder="Type your password"
                        className="py-2 px-4 block w-full outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
                <a href="#" className="text-xs text-blue-600 hover:underline float-right mt-2">Forgot password?</a>
            </div>

            <button className="block w-full bg-gradient-to-r from-blue-400 to-purple-600 text-white font-medium rounded-lg px-4 py-2 mb-4">LOGIN</button>
        </form>
    );
};

export default Login;
