import {useEffect, useRef, useState} from "react";
import {useAppContext} from "../context/AppContext";

const eventsMapping = {
  onClick: ["click", (event, map) => {return {event, map}}]
};

export default function useGoogleMap({zoom, center, events}) {
  const [mapState, setMapState] = useState({loading: true});
  const [{loading, google}] = useAppContext();
  const mapRef = useRef();
  useEffect(() => {
    if (google) {
      const map = new google.maps.Map(mapRef.current, {zoom, center, disableDefaultUI: true, zoomControl: true});
      Object.keys(events).forEach(eventName => {
        map.addListener(eventsMapping[eventName][0], (event) => {
          events[eventName](eventsMapping[eventName][1](event, map))
        })
      });

      setMapState({maps: google.maps, map, loading: false});
    }
  }, [google]);
  return {mapRef, ...mapState};
}
