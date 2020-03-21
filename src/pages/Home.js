
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Map from '../maps/Map';
import useGoogleApi from '../maps/useGoogleApi';
import {usePosition} from '../maps/useLocation';


const defaultLocation = {lat: 53.551086, lng: 9.993682};

const useStyles = makeStyles(theme => ({
    root: {
    },
    toolbar: {
        backgroundColor: theme.palette.common.white,
    }
}));

export default function Home() {
    const classes = useStyles();
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
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <form onSubmit={onSearch} style={{width: "100%"}}>
                            <InputBase
                                name="search"
                                placeholder="Search for a business you want to support..."
                                autoFocus
                                fullWidth={true}
                            />
                        </form>
                    </Toolbar>
                </AppBar>
            </div>
            <MapContainer>
                <Places>
                    {places.map(place => {
                        return <p key={place}>{place}</p>
                    })}
                </Places>
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
    z-index: -1;
`;
const Places = styled.div`
    width: 20%;
    height: 100%;
`;
const BoxedMap = styled.div`
    height: 100%;
    flex-grow: 1;
`;
