import React, {useEffect} from 'react';
import Navbar from "../Common/Navbar/Navbar";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {PathConstants} from "../../constants/PathConstants";

const MainLayout = () => {
    const navigate = useNavigate();
    const { jwt } = useSelector((s) => s.user);

    useEffect(() => {
        if (!jwt) {
            navigate(PathConstants.LOGIN);
        }
    }, [jwt, navigate]);

    return (
        <div className="flex">
            <Navbar />
            <div className="flex-grow pl-64">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
