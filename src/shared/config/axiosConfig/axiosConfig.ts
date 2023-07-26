import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "http://localhost:3000/"
  : import.meta.env.VITE_API_BASE_URL;

export const instance = axios.create({
  baseURL,
});

export const mapGeoInstance = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode",
});
