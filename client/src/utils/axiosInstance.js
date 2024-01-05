import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import {loadState, saveState} from "../store/storage";
import {JWT_PERSISTENT_STATE} from "../store/user.slice";

const config = {
    baseURL: process.env.REACT_APP_API_URL,
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(async (req) => {
    const access_token = loadState(JWT_PERSISTENT_STATE) || null;
    if (!access_token.jwt) {
        req.withCredentials = true;
        return req;
    }
    req.headers = { ...req.headers };
    req.headers.Authorization = `Bearer ${access_token.jwt}`;
    const user: { exp: number; sub: string; iat: string } = jwt_decode(access_token.jwt);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const {data} = await axios.post(`${config.baseURL}/auth/token/refresh`, {}, { withCredentials: true });
    //TODO - сохранение
    saveState({ jwt: data.data.access_token }, JWT_PERSISTENT_STATE);

    req.headers.Authorization = `Bearer ${data.data.access_token}`;

    return req;
});

axiosInstance.interceptors.response.use((res) => {
    return res.data;
});
export default axiosInstance;