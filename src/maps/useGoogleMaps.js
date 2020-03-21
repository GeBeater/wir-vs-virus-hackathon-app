import {useEffect, useState, useRef} from "react";
import GoogleMapsApiLoader from "google-maps-api-loader";

const apiKey = process.env.REACT_APP_GOOGLE_KEY;

const eventsMapping = {
  onCenterChanged: ["center_changed", map => map.getCenter()],
  onBoundsChangerd: ["bounds_changed", map => map.getBounds()]
};

let isInitialized = false;
let placesService;

export async function initApis() {
  if (!isInitialized) {
    const mapRef = useRef();

    await GoogleMapsApiLoader({
      libraries: ['places'],
      apiKey
    }).then(google => {
        const map = new google.maps.Map(mapRef.current, {zoom: 3, center: {lng: 3, lat: 3}, disableDefaultUI: true});
        placesService = new google.maps.places.PlacesService(map);
        isInitialized = true;
        return Promise.resolve();
    })
  } else {
    return Promise.resolve();
  }
}

export default function useGoogleMap({zoom, center, events}) {
  const [mapState, setMapState] = useState({loading: true});
  const mapRef = useRef();

  useEffect(() => {
    GoogleMapsApiLoader({
        libraries: ['places'],
        apiKey
      }).then(google => {
      const map = new google.maps.Map(mapRef.current, {zoom, center, disableDefaultUI: true});
      const placesService = new google.maps.places.PlacesService(map);

      placesService.getDetails({
        placeId: 'ChIJAUKRDWz2wokRxngAavG2TD8'
      }, function(place, status) {
        console.log("test");
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(place.reviews);
          // Intended behavior is to set this.setState({places.place.reviews})
        }
      })

      Object.keys(events).forEach(eventName =>
        map.addListener(eventsMapping[eventName][0], () =>
          events[eventName](eventsMapping[eventName][1](map))
        )
      );

      setMapState({maps: google.maps, map, loading: false});
    });
  }, []);
  return {mapRef, ...mapState};
}
