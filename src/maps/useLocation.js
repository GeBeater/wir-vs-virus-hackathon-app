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
        setTimeout(() => {
            dispatch({type: SET_LOADING, payload: false});
        }, 1000)
    };

    const onError = (error) => {
        setError(error.message);
        setTimeout(() => {
            dispatch({type: SET_LOADING, payload: false});
        }, 1000)
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