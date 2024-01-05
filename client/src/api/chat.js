import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import instance from '../utils/axiosInstance';

export const getChatIdByUser = async (userId) => {
    try {
      const { data: result }: AxiosResponse = await instance.get(`/chat/user/${userId}`);
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }


export const getChats = createAsyncThunk('chat/getChats',
  async () => {
    try {
      const { data: result }: AxiosResponse = await instance.get(`/chat`);
      return result;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);
