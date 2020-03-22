import {useState, useEffect} from "react";
import {useAppContext, SET_LOADING} from "../context/AppContext";

export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    const [_, dispatch] = useAppContext();

    const onChange = ({coords}) => {
        setPosition({
            lat: coords.latitude,
            lng: coords.longitude,
        });
        dispatch({type: SET_LOADING, payload: false});
    };

    const onError = (error) => {
        setError(error.message);
        dispatch({type: SET_LOADING, payload: false});
    };

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }
        geo.getCurrentPosition(onChange, onError)
    }, []);
    return {...position, error};
}