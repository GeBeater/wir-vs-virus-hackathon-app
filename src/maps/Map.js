import React, {useEffect} from "react";
import useGoogleMap from "./useGoogleMaps";
import styled from "styled-components";

export default function Map({center, zoom, children, events}) {
  const {maps, map, mapRef, loading} = useGoogleMap({zoom, center, events});

  useEffect(
    () => {
      map && map.panTo(center);
    },
    [center.lat, center.lng]
  );

  return (
    <MapContainer>
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
