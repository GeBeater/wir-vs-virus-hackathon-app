
import {Button, Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/cofund.svg";
import Help from "../assets/help-icon.svg";
import {ADD_PLACE, useAppContext} from "../context/AppContext";
import Map from '../maps/Map';
import {usePosition} from '../maps/useLocation';
import Search from "../search/Search";
import {colors, spacing} from "../theme/theme";
import {PlaceTile} from "./PlaceTile";

const defaultLocation = {lat: 53.551086, lng: 9.993682};

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 3
    },
    toolbar: {
        backgroundColor: colors.white,
    },
    paper: {
        width: "25%",
        padding: spacing.l,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
}));

export default function Home() {
    const classes = useStyles();
    const [currentPlace, setCurrentPlace] = useState(null);
    const [center, setCenter] = useState(defaultLocation)
    const location = usePosition();
    const [{loading, google, places, map}, dispatch] = useAppContext();
    let geocoder;

    const events = {
        onClick: (data) => {
            const placeId = data.event.placeId;
            setCurrentPlace(placeId)
        }
    };

    // selection changes
    useEffect(() => {
        console.log(places)
        if (currentPlace && places.filter(place => place.place_id === currentPlace).length == 0) {
            const service = new google.maps.places.PlacesService(map);
            service.getDetails({placeId: currentPlace, fields: ['id', 'name', 'place_id', 'icon', 'formatted_address', 'address_components']}, (details, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    dispatch({type: ADD_PLACE, payload: details});
                }
            });
        }
    }, [currentPlace])

    useEffect(() => {
        if (location.loaded && !location.error && center === defaultLocation) {
            setCenter({...location})
        }
    }, [location, center]);

    return (
        <Container>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                        <Search onSelected={setCenter}/>
                        <img src={Help} style={{width: 40, height: 40, marginLeft: spacing.m}} alt="CoFund Logo" />
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
                        {places.map(place => <PlaceTile key={place.id} place={place} />)}
                    </div>
                    <footer>
                        <Button component={Link} to="/list" variant="contained" color="primary" disableElevation fullWidth={true} >
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
