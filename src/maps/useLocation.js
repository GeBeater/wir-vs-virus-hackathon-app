import {useState, useEffect} from "react";

export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const onChange = ({coords}) => {
        setPosition({
            lat: coords.latitude,
            lng: coords.longitude,
        });
        setLoaded(true)
    };
    const onError = (error) => {
        setError(error.message);
        setLoaded(true)
    };
    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }
        geo.getCurrentPosition(onChange, onError)
    }, []);
    return {...position, error, loaded};
}