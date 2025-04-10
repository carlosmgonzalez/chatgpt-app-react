import axios from "axios";

export const API_URL = import.meta.env.VITE_URL_API;

export const apiChatGpt = axios.create({
  baseURL: API_URL,
});
