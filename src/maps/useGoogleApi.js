import GoogleMapsApiLoader from "google-maps-api-loader";
import {useEffect, useState} from "react";
import {apiKey} from "./apiKey";
import {SET_LOADING, useAppContext} from "../context/AppContext";

export default function useGoogleApi() {
  const [google, setGoogle] = useState(null);
  const [_, dispatch] = useAppContext();

  useEffect(() => {
    GoogleMapsApiLoader({apiKey, libraries: ['places']}).then(google => {
      setGoogle(google);
      dispatch({type: SET_LOADING, payload: false});
    });
  }, []);
  return google;
}
