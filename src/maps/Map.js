import React, {useEffect} from "react";
import styled from "styled-components";
import useGoogleMap from "./useGoogleMaps";

export default function Map({center, zoom, children, events, google, style}) {
    const {maps, map, mapRef, loading} = useGoogleMap({zoom, center, events, google});

    useEffect(setCenter, [center]);

    function setCenter() {
        map && map.panTo(center);
        if (center.placeId) {
            let infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent('<b>Found it!</b><br>Zoom in and click on the marker to add to your donation list');
            var location = {lat: center.lat, lng: center.lng};
            location.lat = location.lat + 0.00002;
            infoWindow.setPosition(location);
            infoWindow.open(map);
        }
    }
    return (
        <MapContainer style={style}>
            <MapRef ref={mapRef} />
            {!loading &&
                React.Children.map(children, child => {
                    return React.cloneElement(child, {map, maps});
                })}
        </MapContainer>
    );
}

const MapContainer = styled.div`
    height: 100%;
`;

const MapRef = styled.div`
    height: 100%;
`;
