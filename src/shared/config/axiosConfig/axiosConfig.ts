import axios from "axios";

export const instance = axios.create({
    baseURL: "https://delivery-api-qswu.onrender.com",
});

// https://delivery-api-qswu.onrender.com
// http://localhost:3000