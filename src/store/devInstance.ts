import axios from "axios";
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
        return Promise.reject(error);
    }
);
