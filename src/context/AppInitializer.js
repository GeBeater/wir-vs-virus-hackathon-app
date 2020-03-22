import GoogleMapsApiLoader from "google-maps-api-loader";
import {useEffect} from "react";
import {apiKey} from "../maps/apiKey";
import {SET_GOOGLE_INSTANCE, useAppContext} from "./AppContext";

export const AppInitializer = () => {
    const [_, dispatch] = useAppContext();
    useEffect(() => {
        GoogleMapsApiLoader({apiKey, libraries: ['places']}).then(google => {
            dispatch({type: SET_GOOGLE_INSTANCE, payload: google});
        });
    }, []);

    return null;
};
