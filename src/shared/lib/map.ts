import axios from 'axios'
import { AppDispatch } from '~/app/providers/StoreProvider/config/config';
import { userActions } from '~/redux/user/userSlice';


export const encodeAddress = async (address: string,
    setMarkerPosition: (arg: any) => void) => {
    try {
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${import.meta.env.VITE_API_KEY_MAPS}`);
        const data = response.data;

        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            const lat = location.lat;
            const lng = location.lng;

            setMarkerPosition({ lat, lng });
        } else {
            console.log('Unable to retrieve coordinates for the address:', address);
        }
    } catch (error) {
        console.log(error);
        console.log('Error occurred while fetching coordinates:', error);
    }
}

export const getGeoCode = async (dispacth: AppDispatch,
    setMarkerPosition: (arg: any) => void,
    lat: number | string, lng: number | string) => {
    try {
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_API_KEY_MAPS}`)
        dispacth(userActions.setAddress(data.results[0].formatted_address))
        setMarkerPosition({ lat, lng });
    } catch (e) {
        console.log(e)
    }
}