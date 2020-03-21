
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Map from '../maps/Map';
import {usePosition} from '../maps/useLocation';
import useGoogleApi from '../maps/useGoogleApi';

const defaultLocation = {lat: 53.551086, lng: 9.993682};

export default function Home() {
    const [places, setPlaces] = useState([]);
    const [currentPlace, setCurrentPlace] = useState(null);
    const [center, setCenter] = useState(defaultLocation)
    const location = usePosition();
    const google = useGoogleApi();
    let geocoder;

    const events = {
        onClick: (data) => {
            const placeId = data.event.placeId;
            setCurrentPlace(placeId);
        }
    }

    // selection changes
    useEffect(() => {
        if (currentPlace && places.indexOf(currentPlace) === -1) {
            setPlaces([...places, currentPlace]);
        }
    }, [currentPlace, places])

    useEffect(() => {
        if (location.loaded && !location.error && center == defaultLocation) {
            setCenter({...location})
        }
    }, [location])

    function onSearch(event) {
        event.preventDefault();
        const searchTerm = event.target.search.value;
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
        }
        geocoder.geocode({'address': searchTerm}, function (results, status) {
            if (status == "OK") {
                setCenter(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    return (
        <Container>
            <SearchBar>
                <form onSubmit={onSearch}>
                    <SearchField name="search" autoFocus placeholder="Search your location..."></SearchField>
                </form>
            </SearchBar>
            <MapContainer>
                {places.length > 0 &&
                    <Places>
                        {places.map(place => {
                            return <p key={place}>{place}</p>
                        })}
                    </Places>
                }
                <BoxedMap>
                    <Map
                        zoom={16}
                        center={center}
                        events={events}
                        google={google}
                    />
                </BoxedMap>
            </MapContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
`;
const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;
const Places = styled.div`
    width: 200px;
    height: 100%;
`;
const BoxedMap = styled.div`
    height: 100%;
    flex-grow: 1;
`;
const SearchBar = styled.header`
    width: 100%;
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    padding: 10px 20px;
    height: 75px;
    background-color: rgba(230,230,230);
`;

const SearchField = styled.input`
    text-indent: 10px;
    text-align:left;
    font-size: 1.5em;
    color: palevioletred;
    height: 100%;
    width: 100%;
    outline: 0;
    margin:0;
    border:0;
    border-radius: 10px;
    background-color: rgba(220,220,220);
    &::placeholder {
        opacity: 0.5;
        color: palevioletred;
    }
`;
