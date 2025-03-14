import axios from "axios";

export const api = axios.create({
  baseURL: "https://ole-pt.onrender.com/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});