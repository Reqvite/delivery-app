import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const mapGeoInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode',
});
