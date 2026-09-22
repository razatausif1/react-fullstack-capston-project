//Filepath: src/api/axiosClient.ts
import axios from "axios";
import { getToken } from "../utils/auth";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api", //backend API url
});

axiosClient.interceptors.request.use((config) => {
    const token = getToken()

    if (token) {
        config.headers.set("Authorization", `Bearer ${token}` );
    }

    return config;
});

export default axiosClient;