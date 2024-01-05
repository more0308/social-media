import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailUser as user} from "../../../api/user";
import UserProfile from "../../../components/Common/User/UserProfile";

const Profile = () => {
    const {login} = useParams();
    const { detailUser } = useSelector((s) => s.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(user(login));
    }, [dispatch, login]);

    return (
        <div>
            {detailUser && <UserProfile detailUser={detailUser} />}
        </div>
    );
};

export default Profile;