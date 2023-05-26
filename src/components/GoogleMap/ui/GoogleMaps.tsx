import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Loader } from "~/shared/ui/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { selectUserAddress } from "~/redux/user/selectors";
import { encodeAddress, getGeoCode } from "~/shared/lib/map";
import { DEFOULT_GEO } from "~/shared/const/const";
import cls from "./GoogleMaps.module.scss";

const GoogleMaps = () => {
  const dispacth = useDispatch<AppDispatch>();
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const address = useSelector(selectUserAddress);

  const [markerPosition, setMarkerPosition] = useState(DEFOULT_GEO);

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
      const func = async () => {
        console.log(window.google);
        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: "kiev",
          destination: "nikopol",
          travelMode: window.google.maps.TravelMode.DRIVING,
        });

        console.log(results);
      };
      func();
    }
  }, [address]);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={cls.mapContainer}
      center={markerPosition}
      zoom={12}
      onClick={handleMapClick}
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
