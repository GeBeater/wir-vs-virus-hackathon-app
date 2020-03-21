
import {Button, Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Logo from "../assets/cofund.svg";
import SearchIcon from "../assets/search.svg";
import {ADD_PLACE, useAppContext} from "../context/AppContext";
import Map from '../maps/Map';
import {usePosition} from '../maps/useLocation';
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
    search: {
        backgroundColor: colors.grayA05,
        display: "flex",
        borderRadius: "4px",
        width: "60%",
        padding: `${spacing.s} ${spacing.m}`,
        marginLeft: spacing.m
    },
    searchInput: {
        marginLeft: spacing.m,
        flexGrow: 1,
    },
    searchField: {
        '&::placeholder': {
            color: colors.grayA50,
            opacity: 1
        }
    }
}));

export default function Home() {
    const classes = useStyles();
    const [currentPlace, setCurrentPlace] = useState(null);
    const [center, setCenter] = useState(defaultLocation)
    const location = usePosition();
    const [{loading, google, places}, dispatch] = useAppContext();
    // const [places, setPlaces] = useState([]);
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
            dispatch({type: ADD_PLACE, payload: currentPlace});
            // setPlaces([...places, currentPlace]);
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
                        <form onSubmit={onSearch} className={classes.search}>
                            <img src={SearchIcon} style={{width: 30, height: 30, color: colors.grayA50}} alt="CoFund Logo" />
                            <InputBase
                                name="search"
                                placeholder="Search for a business you want to support..."
                                autoFocus
                                classes={{root: classes.searchInput, input: classes.searchField}}
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
