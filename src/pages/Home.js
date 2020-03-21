
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider} from "styled-components";
import Map from '../maps/Map';
import useGoogleApi from '../maps/useGoogleApi';
import {usePosition} from '../maps/useLocation';
import Logo from "../assets/cofund.svg";
import {Paper, Button} from "@material-ui/core";
import {theme} from "../App";

const defaultLocation = {lat: 53.551086, lng: 9.993682};

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 3
    },
    toolbar: {
        backgroundColor: theme.palette.common.white,
    },
    paper: {
        width: "25%",
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    search: {
        backgroundColor: "#F0F0F2",
        padding: "5px 20px",
        borderRadius: "10px",
        width: "60%"
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
        if (location.loaded && !location.error && center === defaultLocation) {
            setCenter({...location})
        }
    }, [location, center])

    function onSearch(event) {
        event.preventDefault();
        const searchTerm = event.target.search.value;
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
        }
        geocoder.geocode({'address': searchTerm}, function (results, status) {
            if (status === "OK") {
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
                        <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                        <form onSubmit={onSearch} style={{width: "100%", marginLeft: "20px"}}>
                            <InputBase
                                name="search"
                                placeholder="Search for a business you want to support..."
                                autoFocus
                                classes={{root: classes.search}}
                            />
                        </form>
                    </Toolbar>
                </AppBar>
            </div>
            <MapContainer>
                <Paper className={classes.paper}>
                    <header style={{flexGrow: 1}}>
                        <h1>Hello!</h1>
                        <h3>Let us together help our favourite stores</h3>
                        <p>Start and click on your favorite store on the map. If you do not want to choose just one, choose several.</p>
                    </header>
                    <div>
                        {places.map(place => {
                            return <p key={place}>{place}</p>
                        })}
                    </div>
                    <footer>
                        <Button variant="contained" color="primary" disableElevation fullWidth={true}>
                            Support your favorite branches
                        </Button>
                    </footer>
                </Paper>
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
const BoxedMap = styled.div`
    height: 100%;
    flex-grow: 1;
`;
