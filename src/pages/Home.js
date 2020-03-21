
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Map from '../maps/Map';
import CompanyList from '../pages/CompanyList';
import {usePosition} from '../maps/useLocation';
import useGoogleApi from '../maps/useGoogleApi';

import {fade, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const defaultLocation = {lat: 53.551086, lng: 9.993682};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        backgroundColor: theme.palette.common.white,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.common.black,
    },
    search: {
        position: 'relative',
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        color: theme.palette.common.black,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
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
        const searchTerm = event.target.value;
        console.log("Hello, my name is David Hasselhoff and today I'm not looking for love but: " + searchTerm);
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
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase onChange={onSearch}
                                placeholder="Search for a business you want to support..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                autoFocus
                            />
                        </div>
                        <Link href="/signin" variant="body2">
                            <Button color="black">Login</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
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
