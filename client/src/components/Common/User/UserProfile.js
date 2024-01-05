import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {PathConstants} from "../../../constants/PathConstants";
import {follow as followRequest, unfollow as unfollowRequest} from "../../../api/user";
import {getChatIdByUser} from "../../../api/chat";

const UserProfile = ({detailUser}) => {
    const { user } = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        setIsFollow(detailUser.user.is_following);
    }, [detailUser.user.is_following]);

    const follow = () => {
        dispatch(followRequest(detailUser.user._id));
        setIsFollow(true);
    }

    const unfollow = () => {
        dispatch(unfollowRequest(detailUser.user._id));
        setIsFollow(false);
    }

    const redirectToChat = async () => {
        const {chat_id} = await getChatIdByUser(detailUser.user._id);
        navigate(PathConstants.CHAT.replace(':id', chat_id));
    }

    return (
        <div className="flex flex-col items-center py-8">
            <div className="w-full max-w-2xl">
                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        <img
                            className="w-24 h-24 rounded-full border-4 border-gray-300"
                            src={detailUser.user.avatar}
                            alt="User profile"
                        />
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold">{detailUser.user.name}</h1>
                            <p className="text-gray-600">@{detailUser.user.login}</p>
                        </div>
                    </div>

                    <button onClick={redirectToChat} className="text-blue-700 bg-blue-200 px-4 py-2 rounded-md">
                        Write
                    </button>

                    { detailUser?.user._id !== user?._id &&
                        <div>
                            {isFollow &&
                                <button
                                    onClick={unfollow}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Unsubscribe
                                </button>
                            }
                            {!isFollow &&
                                <button onClick={follow} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                    Subscribe
                                </button>
                            }
                        </div>
                    }

                </div>
                <div className="flex justify-around py-4 border-t border-b my-4">
                    <div className="text-center">
                        <p className="font-bold">{ detailUser.posts.length } publications</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">{detailUser.user.followers_count} subscribers</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">{detailUser.user.following_count} subscriptions</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4">
                    {detailUser.posts.map((image, index) => (
                        <Link to={PathConstants.DETAIL_POST.replace(':id', image?._id)}>
                        <img
                            key={index}
                            className="w-full h-auto"
                            src={image.images[0].url}
                            alt={`Gallery item ${index}`}
                        />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;