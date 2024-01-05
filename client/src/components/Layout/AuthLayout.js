import React, {useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {FaFacebookF, FaGoogle, FaTwitter} from "react-icons/fa";
import {PathConstants} from "../../constants/PathConstants";

const AuthLayout = () => {
    const location = useLocation();
    const isRegisterPage = location.pathname === PathConstants.REGISTER;

    const navigate = useNavigate();
    const { jwt } = useSelector((s) => s.user);

    useEffect(() => {
        console.log(jwt)
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-10 text-gray-800 text-center">
                    {isRegisterPage ? "Register" : "Sign In"}
                </h2>
                <Outlet/>
                <p className="text-sm font-medium text-center text-gray-500 mb-4">
                    Or {isRegisterPage ? "Sign Up" : "Sign In"} Using
                </p>

                <div className="flex justify-center gap-4 mb-4">
                    <button aria-label="Sign up with Facebook" className="text-white bg-blue-500 rounded-full p-3">
                        <FaFacebookF />
                    </button>
                    <button aria-label="Sign up with Twitter" className="text-white bg-blue-400 rounded-full p-3">
                        <FaTwitter />
                    </button>
                    <button aria-label="Sign up with Google" className="text-white bg-red-500 rounded-full p-3">
                        <FaGoogle />
                    </button>
                </div>

                <p className="text-sm font-medium text-center text-gray-500">Or Sign Up Using</p>

                <Link
                    to={isRegisterPage ? PathConstants.LOGIN : PathConstants.REGISTER}
                    className="block w-full text-blue-600 font-medium rounded-lg px-4 py-2 mt-4 border border-blue-600"
                >
                    {isRegisterPage ? "SIGN IN" : "SIGH UP"}
                </Link>
            </div>
        </div>
    );
};

export default AuthLayout;