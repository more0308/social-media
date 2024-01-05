import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import {detailUser, login, logout, register, users} from '../api/user';
import {detailPost, posts} from "../api/post";
import { getChats} from "../api/chat";
import {createMessage, getMessages} from "../api/message";


export const JWT_PERSISTENT_STATE = 'jwtData';
export const USER_PERSISTENT_STATE = 'userData';
export const DETAIL_USER_PERSISTENT_STATE = 'detailUserData';
export const POST_PERSISTENT_STATE = 'postData';
export const POSTS_PERSISTENT_STATE = 'postsData';
export const USERS_PERSISTENT_STATE = 'usersData';
export const CHATS_PERSISTENT_STATE = 'chatsData';
export const CHAT_PERSISTENT_STATE = 'chatData';



const initialState = {
  user: loadState(USER_PERSISTENT_STATE)?.user ?? null,
  detailUser: loadState(DETAIL_USER_PERSISTENT_STATE)?.detailUser ?? null,
  jwt: loadState(JWT_PERSISTENT_STATE)?.jwt ?? null,
  post: loadState(POST_PERSISTENT_STATE)?.post ?? null,
  posts: loadState(POSTS_PERSISTENT_STATE)?.post ?? null,
  users: loadState(USERS_PERSISTENT_STATE)?.users ?? null,
  chats: loadState(CHATS_PERSISTENT_STATE)?.chats ?? null,
  chat: loadState(CHAT_PERSISTENT_STATE)?.chat ?? null,
  error: undefined
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    newMessage: (state, action) => {
      state.chat.push(action.payload.message);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
      state.user = action.payload.user;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.jwt = null;
      state.user = null;
    });

    builder.addCase(detailPost.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.post = action.payload.post;
    });
    builder.addCase(detailPost.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(posts.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.posts = action.payload.posts;
    });
    builder.addCase(posts.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(detailUser.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.detailUser = { user: action.payload.user, posts: action.payload.userPosts };
    });

    builder.addCase(users.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.users = action.payload.users;
    });

    builder.addCase(getChats.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.chats = action.payload.chats;
    });

    builder.addCase(getMessages.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.chat = action.payload.messages.reverse();
    });

    builder.addCase(createMessage.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.chat.push(action.payload.message);
    });
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;