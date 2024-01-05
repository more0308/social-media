import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import instance from '../utils/axiosInstance';

export const createMessage = createAsyncThunk('message/createMessage',
    async (params) => {
        try {
            const { data: result }: AxiosResponse = await instance.post(`/message`, params);
            return result;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);

export const getMessages = createAsyncThunk('message/getChat',
    async (id) => {
        try {
            const { data: result }: AxiosResponse = await instance.get(`/message/chat/${id}`);
            return result;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);