import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {createPost} from "../../api/post";
import {useForm} from "react-hook-form";

const CreatePost = () => {
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        const files = data.images;
        console.log(data.images);
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('description', data.description);
        dispatch(createPost(formData));
    }

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, idx) => idx !== index));
    };

    return (
        <div className="flex items-center justify-center h-screen px-4">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6" encType="multipart/form-data">
          <textarea
              {...register("description", {
                  required: "Recipe picture is required",
              })}
              className="p-4 text-lg border border-gray-300 rounded-lg"
              placeholder="What's on your mind?"
              rows="4"
          />
                    <div className="flex items-center justify-center p-4 border border-gray-300 rounded-lg">
                        <label className="cursor-pointer">
                            <FaCamera className="text-gray-500 mr-2 text-xl" />
                            <span className="text-lg">Add Photos</span>
                            <input
                                {...register("images", {
                                    required: "Recipe picture is required",
                                })}
                                type="file"
                                multiple
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-32 h-32">
                                <img src={URL.createObjectURL(image)} alt={`upload-${index}`} className="w-full h-full object-cover rounded-lg" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 text-lg"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white text-lg rounded-lg p-4 hover:bg-blue-600"
                    >
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
