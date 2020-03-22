import GoogleMapsApiLoader from "google-maps-api-loader";
import {useEffect, useState} from "react";
import {useAppContext} from "../context/AppContext";
import {apiKey} from "./apiKey";

export default function useGoogleApi() {
  const [google, setGoogle] = useState(null);
  const [_, dispatch] = useAppContext();

  useEffect(() => {
    GoogleMapsApiLoader({apiKey, libraries: ['places']}).then(google => {
      setGoogle(google);
    });
  }, []);
  return google;
}
