
import {Button, Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import useMobileDetect from 'use-mobile-detect-hook';
import Logo from "../assets/cofund.svg";
import Help from "../assets/help-icon.svg";
import Loading from "../assets/three-dots.svg";
import {ADD_PLACE, useAppContext} from "../context/AppContext";
import Map from '../maps/Map';
import {usePosition} from '../maps/useLocation';
import Search from "../search/Search";
import {colors, spacing} from "../theme/theme";
import CompanyList from "./CompanyList";

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
    list: {
        width: '100%',
    }
}));

export default function Home() {
    const detectMobile = useMobileDetect();
    const classes = useStyles();
    const [currentPlace, setCurrentPlace] = useState(null);
    const [center, setCenter] = useState(defaultLocation)
    const location = usePosition();
    const [{google, places, map, loading}, dispatch] = useAppContext();

    const events = {
        onClick: (data) => {
            const placeId = data.event.placeId;
            setCurrentPlace(placeId)
        }
    };

    useEffect(selectCurrentPlace, [currentPlace])
    useEffect(refreshCenter, [location, center]);

    return (
        <Container>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                        <Search onSelected={setCenter} />
                        <img src={Help} style={{width: 40, height: 40, marginLeft: spacing.m}} alt="CoFund Logo" />
                    </Toolbar>
                </AppBar>
            </div>
            <MapContainer>
                {!detectMobile.isMobile() && <Paper className={classes.paper}>
                    <header style={{flexGrow: 1}}>
                        <h1>Hello!</h1>
                        <h3>Let us together help our favourite stores</h3>
                        <p>Start and click on your favorite store on the map. If you do not want to choose just one, choose several.</p>
                    </header>
                    <CompanyList />
                    <StartNow amount={places.length} />
                </Paper>
                }
                <BoxedMap>
                    <img style={{position: "absolute", zIndex: 0, top: "50%", left: "50%", marginLeft: "-50px"}} alt="We are loading" width="180px" height="60px" src={Loading}></img>
                    <MapWrapper style={{opacity: loading ? 0 : 1}}>
                        <Map
                            zoom={16}
                            center={center}
                            events={events}
                            google={google}
                        />
                    </MapWrapper>
                </BoxedMap>
            </MapContainer>
            {detectMobile.isMobile() && <MobileStartNow amount={places.length} />}
        </Container>
    )

    function refreshCenter() {
        if (!loading && !location.error && location.lat && center === defaultLocation) {
            setCenter({...location})
        }
    }

    function selectCurrentPlace() {
        if (currentPlace && places.filter(place => place.place_id === currentPlace).length === 0) {
            const service = new google.maps.places.PlacesService(map);
            service.getDetails({placeId: currentPlace, fields: ['id', 'name', 'place_id', 'icon', 'formatted_address', 'address_components']}, (details, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    dispatch({type: ADD_PLACE, payload: details});
                }
            });
        }
    }
}


function StartNow({className, amount}) {
    return (
        <div className={className}>
            {(amount > 0) &&
                <Button component={Link} to="/checkout" variant="contained" color="primary" disableElevation fullWidth={true}>Support your {amount} branches now</Button>
            }
        </div>
    )
}


const MapWrapper = styled.div`
    height: 100%;
`;

const MobileStartNow = styled(StartNow)`
    position: fixed;
    bottom: 10px;
    z-index: 3;
    width: 70%;
    align-self: center;
`

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
    position: relative;
    background-color: rgb(240,240,240);
`;
