import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import instance from '../utils/axiosInstance';

export const createPost = createAsyncThunk('post/createPost',
  async (params) => {
    try {
      const { data: result }: AxiosResponse = await instance.post('/post', params);
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const detailPost = createAsyncThunk('post/detailPost',
  async (params) => {
    try {
      const { data: result }: AxiosResponse = await instance.get(`/post/${params.post_id}`);
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const posts = createAsyncThunk('post/posts',
  async () => {
    try {
      const { data: result }: AxiosResponse = await instance.get(`/post`);
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const toggleLike = createAsyncThunk('post/toggleLike',
  async (post_id) => {
    try {
      const { data: result }: AxiosResponse = await instance.post(`/post/like`, {post_id});
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);
export const toggleDislike = createAsyncThunk('post/toggleDislike',
  async (post_id) => {
    try {
      const { data: result }: AxiosResponse = await instance.post(`/post/dislike`, {post_id});
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);
