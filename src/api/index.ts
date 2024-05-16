// src/api/axios.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

// Public Axios instance
export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

// Authenticated Axios instance
export const authAxios = axios.create({
  baseURL: BASE_URL,
});
