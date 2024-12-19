import axios from "axios";

const api = axios.create({
  baseURL: "https://api.tzsexpertacademy.com", // Ajuste conforme a API real
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
