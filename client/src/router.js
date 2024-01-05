import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import {PathConstants} from "./constants/PathConstants";
import AuthLayout from "./components/Layout/AuthLayout";
import CreatePost from "./pages/Post/CreatePost";
import DetailPost from "./pages/Post/DetailPost";
import Profile from "./pages/User/Profile/Profile";
import UserSearch from "./pages/User/UserSearch/UserSearch";
import Chat from "./pages/Chat/Chat";
import ChatLayout from "./components/Layout/ChatLayout";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: PathConstants.HOME,
                element: <Home/>
            },
            {
                path: PathConstants.CREATE_POST,
                element: <CreatePost/>
            },
            {
                path: PathConstants.DETAIL_POST,
                element: <DetailPost/>
            },
            {
                path: PathConstants.USER_SEARCH,
                element: <UserSearch/>
            },
            {
                path: PathConstants.PROFILE,
                element: <Profile/>
            },
            {
                path: PathConstants.CHATS,
                element: <ChatLayout/>,
                children: [
                    {
                        path: PathConstants.CHAT,
                        element: <Chat/>
                    }
                ]
            },
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: PathConstants.LOGIN,
                element: <Login/>
            },
            {
                path: PathConstants.REGISTER,
                element: <Register/>
            }
        ]
    },

]);
