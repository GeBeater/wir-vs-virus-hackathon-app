
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
import {getPlaceDetails} from "../maps/placesApi";
import {usePosition} from '../maps/useLocation';
import Search from "../search/Search";
import {colors, spacing} from "../theme/theme";

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
    const [{loading, google, places}, dispatch] = useAppContext();
    let geocoder;

    const events = {
        onClick: (data) => {
            const placeId = data.event.placeId;
            getPlaceDetails(placeId).then(data => {
                setCurrentPlace({placeId, data})
            });
        }
    };

    // selection changes
    useEffect(() => {
        if (currentPlace && places.indexOf(currentPlace) === -1) {
            dispatch({type: ADD_PLACE, payload: currentPlace});
        }
    }, [currentPlace, places])

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
                        {places.map(place => {
                            if (place) {
                                return <p key={place.placeId}>{place.data.result.name}</p>
                            }   
                        })}
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
