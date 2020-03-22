import {Button, Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Alert from "@material-ui/lab/Alert";
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from "react-router-dom";
import styled from "styled-components";
import useMobileDetect from 'use-mobile-detect-hook';
import Logo from "../assets/cofund.svg";
import Loading from "../assets/three-dots.svg";
import AlertDialog from "../components/AlertDialog";
import LastFive from "../components/LastFive";
import {ADD_PLACE, useAppContext} from "../context/AppContext";
import Map from '../maps/Map';
import {isSupportedType, isValidPlace} from "../maps/placesUtils";
import {usePosition} from '../maps/useLocation';
import Search from "../search/Search";
import {colors, spacing} from "../theme/theme";
import CompanyList from "./CompanyList";
import FAQ from './FAQ';
import WeVsVirusLogo from "../assets/wvv.png";

const defaultLocation = {lat: 53.551086, lng: 9.993682};

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 3
    },
    toolbar: {
        backgroundColor: colors.white,
    },
    paper: {
        width: "30%",
        padding: spacing.l,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    list: {
        width: '100%',
    },
    notificationWrapper: {
        position: 'absolute',
        width: '100%',
        top: 0,
        padding: 10
    },
    notification: {
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)',
    }
}));

export default function Home() {
    const {t} = useTranslation();
    const detectMobile = useMobileDetect();
    const classes = useStyles();
    const [currentPlace, setCurrentPlace] = useState(null);
    const [center, setCenter] = useState(defaultLocation);
    const location = usePosition();
    const [{google, places, map, loading}, dispatch] = useAppContext();
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [pendingPlaceDetails, setPendingPlaceDetails] = useState(null);
    let hideNotificationTimeoutId;
    const events = {
        onClick: (data) => {
            const placeId = data.event.placeId;
            setCurrentPlace(placeId)
        }
    };

    useEffect(selectCurrentPlace, [currentPlace]);
    useEffect(refreshCenter, [location, center]);

    const showSuccessNotification = () => {
        setIsNotificationVisible(true);
        clearTimeout(hideNotificationTimeoutId);
        hideNotificationTimeoutId = setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const handleAlertAgree = () => {
        setIsAlertVisible(false);
    };

    const handleDialogAgree = () => {
        if (pendingPlaceDetails) {
            dispatch({type: ADD_PLACE, payload: {details: pendingPlaceDetails, amount: 0}});
            showSuccessNotification();
            setPendingPlaceDetails(null);
        }
        setIsDialogVisible(false);
    };

    const handleDialogDisagree = () => {
        setPendingPlaceDetails(null);
        setIsDialogVisible(false);
    };

    function refreshCenter() {
        if (!loading && !location.error && location.lat && center === defaultLocation) {
            setCenter({...location})
        }
    }

    function selectCurrentPlace() {
        if (currentPlace && places.filter(place => place.details.place_id === currentPlace).length === 0) {
            const service = new google.maps.places.PlacesService(map);
            service.getDetails({
                placeId: currentPlace,
                fields: ['id', 'name', 'place_id', 'icon', 'address_components', 'types', 'photos', 'formatted_address']
            }, (details, status) => {
                if (!isValidPlace(details, status, google)) {
                    setIsAlertVisible(true);
                    return;
                }

                if (!isSupportedType(details)) {
                    setIsDialogVisible(true);
                    setPendingPlaceDetails(details);
                    return;
                }

                dispatch({type: ADD_PLACE, payload:  {details, amount: 0}});
                showSuccessNotification();
            });
        }
    }

    function selectSearch(result) {
        setCenter(result);
        setCurrentPlace(result.placeId);
    }

    return (
        <Container>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                        <Search onSelected={selectSearch} location={location} />
                        <FAQ />
                    </Toolbar>
                </AppBar>
            </div>
            <MapContainer>
                {!detectMobile.isMobile() && <Paper className={classes.paper}>
                    <header style={{flexGrow: 1}}>
                        <h1>{t('home.welcome.headline')}</h1>
                        <h3>{t('home.welcome.subline')}</h3>
                        <h3><b>1/</b> {t('home.welcome.step1')}</h3>
                        <h3><b>2/</b> {t('home.welcome.step2')}</h3>
                        <h3><b>3/</b> {t('home.welcome.step3')}</h3>
                        {places.length === 0 && <h3>{t('home.welcome.benext')}</h3>}
                    </header>
                    {places.length > 0 ? <CompanyList /> : <LastFive />}
                    <StartNow amount={places.length} />
                </Paper>
                }
                <BoxedMap>
                    <img style={{position: "absolute", zIndex: 0, top: "50%", left: "50%", marginLeft: "-80px", marginTop: "-30px"}} alt="We are loading" width="180px" height="60px" src={Loading}></img>
                    <WeVsVirus style={{zIndex: 2}}>
                        <img src={WeVsVirusLogo} alt="We versus virus project" />
                    </WeVsVirus>
                    <MapWrapper style={{opacity: loading ? 0 : 1}}>
                        <Map
                            zoom={16}
                            center={center}
                            events={events}
                            google={google}
                        />
                    </MapWrapper>
                    <div className={classes.notificationWrapper}>
                        {isNotificationVisible && (
                            <Alert severity="success" className={classes.notification}>{t('home.success.text')}</Alert>
                        )}
                    </div>
                </BoxedMap>
            </MapContainer>
            {detectMobile.isMobile() && <MobileStartNow amount={places.length} />}
            {isAlertVisible && (
                <AlertDialog
                    title={t('home.error.headline')}
                    message={t('home.error.text')}
                    agree={t('home.error.agree')}
                    handleAgree={handleAlertAgree}
                />
            )}
            {isDialogVisible && (
                <AlertDialog
                    title={t('home.warning.headline')}
                    message={t('home.warning.text')}
                    agree={t('home.warning.agree')}
                    disagree={t('home.warning.disagree')}
                    handleAgree={handleDialogAgree}
                    handleDisagree={handleDialogDisagree}
                />
            )}
        </Container>
    );
}


function StartNow({className, amount}) {
    return (
        <div className={className}>
            {(amount > 0) &&
                <Button component={Link} to="/checkout" variant="contained" color="primary" disableElevation fullWidth={true}>Jetzt unterstützen ({amount})</Button>
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
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
`;
const BoxedMap = styled.div`
    height: 100%;
    flex-grow: 1;
    position: relative;
    background-color: rgb(240,240,240);
`;

const WeVsVirus = styled.div`
    position: absolute;
    
    left: 0;
    @media (max-width: 768px) { 
        bottom: 25px;
    }
    @media (min-width: 769px) { 
        top: 25px;
    }
`;