import axios from "axios";
import { setAuthToken, setCustomer, setUser } from "./auth-slice";
import { clearStepper } from "./stepperSlice";
// import { API_URL } from '../../config/app.config';

const API_URL = "https://apps.dlm.group/ASSETMGTAPI/api/v1";

export const devInstance = axios.create({
    baseURL: API_URL,
});

devInstance.interceptors.response.use(
    async (config: any) => {
        config.headers = {
            "Content-Type": "application/json",
            ...config.headers,
        };
        return config;
    },
    (error: any) => {
        if (error.response.status === 401) {
            localStorage.removeItem("persist:root");
            localStorage.removeItem('token');
            setCustomer(null);
            setUser(null);
            setAuthToken(null);
            clearStepper();
        }
        return Promise.reject(error);
    }
);
