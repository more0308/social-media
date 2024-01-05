import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {detailPost} from "../../api/post";
import Post from "../../components/Common/Post/Post";
import {useParams} from "react-router-dom";

const DetailPost = () => {
    const {id} = useParams();
    const { post } = useSelector((s) => s.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailPost({post_id: id}));
    }, [dispatch, id]);

    return (
        <div>
            {post && <Post post={post}/>}
        </div>
    );
};

export default DetailPost;