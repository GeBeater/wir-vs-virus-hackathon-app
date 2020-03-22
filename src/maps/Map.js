import React, {useEffect} from "react";
import styled from "styled-components";
import useGoogleMap from "./useGoogleMaps";

export default function Map({center, zoom, children, events, google}) {
    const {maps, map, mapRef, loading} = useGoogleMap({zoom, center, events, google});

    useEffect(setCenter, [center]);

    function setCenter() {
        map && map.panTo(center);
        if (center.placeId) {
            let infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent('<b>Gefunden!</b><br>Zoom rein und klicke auf das Symbol');
            var location = {lat: center.lat, lng: center.lng};
            location.lat = location.lat + 0.00002;
            infoWindow.setPosition(location);
            infoWindow.open(map);
        }
    }
    return (
        <>
            <MapRef ref={mapRef} />
            {!loading &&
                React.Children.map(children, child => {
                    return React.cloneElement(child, {map, maps});
                })}
        </>
    );
}

const MapRef = styled.div`
    height: 100%;
`;
