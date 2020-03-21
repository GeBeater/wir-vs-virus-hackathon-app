import {useEffect, useState, useRef} from "react";
import GoogleMapsApiLoader from "google-maps-api-loader";

const apiKey = process.env.REACT_APP_GOOGLE_KEY;

const eventsMapping = {
  onClick: ["click", (event, map) => {return {event, map}}]
};

export default function useGoogleMap({zoom, center, events}) {
  const [mapState, setMapState] = useState({loading: true});
  const mapRef = useRef();
  useEffect(() => {
    GoogleMapsApiLoader({apiKey}).then(google => {
      const map = new google.maps.Map(mapRef.current, {zoom, center, disableDefaultUI: true, zoomControl: true});
      Object.keys(events).forEach(eventName => {
        map.addListener(eventsMapping[eventName][0], (event) => {
          events[eventName](eventsMapping[eventName][1](event, map))
        })
      });

      setMapState({maps: google.maps, map, loading: false});
    });
  }, []);
  return {mapRef, ...mapState};
}
