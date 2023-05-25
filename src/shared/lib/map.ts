import axios from 'axios'
import { Dispatch, SetStateAction } from 'react';
import { AppDispatch } from '~/app/providers/StoreProvider/config/config';
import { userActions } from '~/redux/user/userSlice';

type MarkerPosition = {
    lat: number;
    lng: number;
};

export const encodeAddress = async (address: string,
    setMarkerPosition: Dispatch<SetStateAction<MarkerPosition>>) => {
    try {
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${import.meta.env.VITE_API_KEY_MAPS_NO_RESTRICTION}`);
        const data = response.data;

        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            const lat = location.lat;
            const lng = location.lng;

            setMarkerPosition({ lat, lng });
        }
    } catch (e) { /* empty */ }
}

export const getGeoCode = async (dispacth: AppDispatch,
    setMarkerPosition: Dispatch<SetStateAction<MarkerPosition>>,
    lat: number, lng: number) => {
    try {
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_API_KEY_MAPS_NO_RESTRICTION}`)
        dispacth(userActions.setAddress(data.results[0].formatted_address))
        setMarkerPosition({ lat, lng });
    } catch (e) {
        /* empty */
    }
}