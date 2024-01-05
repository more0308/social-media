import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {posts as getPosts} from "../../api/post";
import Post from "../../components/Common/Post/Post";

const Home = () => {
    const { posts } = useSelector((s) => s.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <>
            {posts && posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </>
    );
};

export default Home;