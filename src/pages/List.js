import React, {useEffect} from 'react';
import styled from "styled-components";
import useGoogleMap from "../maps/useGoogleMaps";

export default function List() {
    const { maps, map, mapRef, loading } = useGoogleMap( 3, {lat: 3, lng: 3});

    useEffect(() => {

    }, []);
    return (
        <Container>
             <Text>
              Here is a really long text that you can do nothing about, its gonna be long wether you like it or not, so be prepared for it to go off screen. Right? Right..!
            </Text>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 75px);
`;

const Text = styled.div`
    width: 100%;
    font-size: 15px;
`;