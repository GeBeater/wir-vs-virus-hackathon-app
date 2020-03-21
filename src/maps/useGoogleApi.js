import GoogleMapsApiLoader from "google-maps-api-loader";
import {useEffect, useState} from "react";
import {apiKey} from "./apiKey";

export default function useGoogleApi() {
  const [google, setGoogle] = useState(null);
  useEffect(() => {
    GoogleMapsApiLoader({apiKey}).then(google => {
      setGoogle(google);
    });
  }, []);
  return google;
}
