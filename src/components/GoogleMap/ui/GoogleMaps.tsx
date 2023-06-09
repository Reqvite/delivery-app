import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { selectUserAddress } from "~/redux/user/selectors";
import { userActions } from "~/redux/user/userSlice";
import { DEFAULT_SHOP_GEO } from "~/shared/const/const";
import { encodeAddress, getGeoCode } from "~/shared/lib/map";
import { Loader } from "~/shared/ui/Loader/Loader";

import cls from "./GoogleMaps.module.scss";

const GoogleMaps = () => {
  const dispacth = useDispatch<AppDispatch>();
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult>();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const address = useSelector(selectUserAddress);
  const [markerPosition, setMarkerPosition] = useState(DEFAULT_SHOP_GEO);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_API_KEY_MAPS,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          getGeoCode(dispacth, setMarkerPosition, lat, lng);
        },
        (e) => {
          console.log("Error occurred while retrieving current location:", e);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [dispacth]);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng!.lat();
    const lng = event.latLng!.lng();

    getGeoCode(dispacth, setMarkerPosition, lat, lng);
  };

  useEffect(() => {
    if (address) {
      encodeAddress(address, setMarkerPosition);
      const setDirection = async () => {
        if (map) {
          const directionsService = new window.google.maps.DirectionsService();
          try {
            const results = await directionsService.route({
              origin: DEFAULT_SHOP_GEO,
              destination: address,
              travelMode: window.google.maps.TravelMode.DRIVING,
            });
            setDirectionsResponse(results);
            if (
              results.routes[0].legs[0].distance &&
              results.routes[0].legs[0].duration
            ) {
              dispacth(
                userActions.setDelivaeryData({
                  distance: results.routes[0].legs[0].distance.text,
                  time: results.routes[0].legs[0].duration.text,
                })
              );
            }
          } catch (e) {
            /* empty */
          }
        }
      };
      setDirection();
    }
  }, [address, dispacth, map]);


  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={cls.mapContainer}
      center={markerPosition}
      zoom={12}
      onClick={handleMapClick}
      onLoad={(map) => setMap(map)}
    >
      <Marker position={markerPosition} title="place" />
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  ) : (
    <Loader className={cls.loader} />
  );
};

export default GoogleMaps;
