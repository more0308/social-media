import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import instance from '../utils/axiosInstance';

export const register = createAsyncThunk('user/register',
  async (params: { email: string, password: string }) => {
    try {
      const { data: result }: AxiosResponse = await instance.post('/auth/register', params);
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const login = createAsyncThunk('user/login',
  async (params: { email: string, password: string }) => {
    try {
      const { data: result }: AxiosResponse = await instance.post('/auth/login', params);
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const logout = createAsyncThunk('user/logout',
  async () => {
    try {
      const { data: result }: AxiosResponse = await instance.post('/auth/logout', {}, {withCredentials: true});
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const detailUser = createAsyncThunk('user/detailUser',
  async (login) => {
    try {
      const { data: result }: AxiosResponse = await instance.get(`/user/${login}`);
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const users = createAsyncThunk('user/users',
  async (query) => {
    try {
      const { data: result }: AxiosResponse = await instance.get(`/user`, {params: {query}});
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const follow = createAsyncThunk('user/follow',
  async (id) => {
    try {
      const { data: result }: AxiosResponse = await instance.post(`/user/follow`, {id});
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const unfollow = createAsyncThunk('user/follow',
  async (id) => {
    try {
      const { data: result }: AxiosResponse = await instance.post(`/user/unfollow`, {id});
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);