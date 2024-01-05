import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleLike as toggleLikeRequest, toggleDislike as toggleDislikeRequest} from '../../../api/post';
import {FaHeart, FaRegHeart} from "react-icons/fa";

const Post = ({post}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((s) => s.user);

    const [currentImage, setCurrentImage] = useState(0);
    const [liked, setLiked] = useState(false);
    const [countLike, setCountLike] = useState(0);

    useEffect(() => {
        setLiked(post.likes.includes(user._id));
        setCountLike(post.likes.length);
    }, [post, user._id]);

    const navigateImages = (e) => {
        // Calculate the click position relative to the image
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;

        // If click on the left side, go to previous, else go to next
        if (x < rect.width / 2) {
            prevImage();
        } else {
            nextImage();
        }
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % post.images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + post.images.length) % post.images.length);
    };

    const toggleLike = () => {
        dispatch(toggleLikeRequest(post._id));
        setLiked(true);
        setCountLike((count)=>count+1);
    };

    const toggleDislike = () => {
        dispatch(toggleDislikeRequest(post._id));
        setLiked(false);
        setCountLike((count)=>count-1);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white min-h-screen py-8">
            <div className="bg-white border border-gray-300 rounded-lg">
                <div className="relative w-full" style={{ height: `600px`, width: `600px` }}>
                    {/* Fixed-size image container */}
                    <img
                        src={post.images[currentImage].url}
                        alt="Gallery"
                        className="object-cover rounded-t-lg h-full w-full cursor-pointer"
                        onClick={navigateImages}
                        style={{ height: `600px`, width: `600px` }}
                    />
                </div>
                <div className="p-4">
                    {/* Post description and interaction icons */}
                    <div className="flex items-center mb-4">
                        {/* Кнопка лайка */}
                        <div className="mr-2">
                            {liked ? (
                                <FaHeart className="cursor-pointer text-red-500 text-2xl" onClick={toggleDislike} />
                            ) : (
                                <FaRegHeart className="cursor-pointer text-2xl" onClick={toggleLike} />
                            )}
                        </div>

                        {/* Текст с количеством лайков */}
                        <p className="font-bold">{countLike} likes</p>
                    </div>
                    {/* Post caption */}
                    <p>
                        <span className="font-bold mr-2">{post.user?.login}</span>
                        {post.description}
                    </p>
                    {/* Comments section */}
                    <p className="text-gray-500 mt-2 cursor-pointer">View all 0 comment</p>
                    {/* Add a comment... */}
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full text-sm placeholder-gray-500 border-none focus:ring-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;