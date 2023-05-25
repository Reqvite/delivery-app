import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { Loader } from '~/shared/ui/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '~/app/providers/StoreProvider/config/config';
import { selectUserAddress } from '~/redux/user/selectors';
import { encodeAddress, getGeoCode } from '~/shared/lib/map';
import cls from './GoogleMaps.module.scss'


const GoogleMaps = () => {
    const dispacth = useDispatch<AppDispatch>()
    const center = useMemo(() => ({
        lat: 50.450001,
        lng: 30.523333
    }), []);

    const [markerPosition, setMarkerPosition] = useState(center);
    const address = useSelector(selectUserAddress)

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_API_KEY
    })

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude: lat, longitude: lng } = position.coords;
                    getGeoCode(dispacth, setMarkerPosition, lat, lng)
                },
                (error) => {
                    console.log('Error occurred while retrieving current location:', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, [dispacth]);


    const handleMapClick = async (event: any) => {
        const lat: string = event.latLng.lat();
        const lng: string = event.latLng.lng();

        getGeoCode(dispacth, setMarkerPosition, lat, lng)
    };

    useEffect(() => {
        if (address) {
            encodeAddress(address, setMarkerPosition)
        }
    }, [address]);

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName={cls.mapContainer}
            center={markerPosition}
            zoom={12}
            onClick={handleMapClick}
        >
            <Marker position={markerPosition} title='place' />
        </GoogleMap>
    ) : <Loader className={cls.loader} />

}

export default GoogleMaps;