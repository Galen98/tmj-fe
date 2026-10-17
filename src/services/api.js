import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_APP_API_KEY,
    }
})

export default api;