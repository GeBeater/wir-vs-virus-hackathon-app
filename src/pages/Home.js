import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Map from '../maps/Map';
import {usePosition} from '../maps/useLocation';

export default function Home() {
    const [places, setPlaces] = useState([]);
    const [currentPlace, setCurrentPlace] = useState(null);
    const location = usePosition();

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

    function getCenter() {
        if (location.error) {
            return {lat: 53.551086, lng: 9.293682};
        } else {
            return location;
        }
    }

    return (
        <Container>
            <SearchBar>
                <SearchField autoFocus placeholder="Search your location..."></SearchField>
            </SearchBar>
            <MapContainer>
                {places.length > 0 &&
                    <Places>
                        {places.map(place => {
                            return <p key={place}>{place}</p>
                        })}
                    </Places>
                }
                {location.loaded &&
                    <BoxedMap>
                        <Map
                            zoom={16}
                            center={getCenter()}
                            events={events}
                        />
                    </BoxedMap>
                }
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
