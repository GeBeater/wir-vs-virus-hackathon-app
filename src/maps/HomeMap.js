import Toolbar from "@material-ui/core/Toolbar";
import Search from "../search/Search";
import Loading from "../assets/three-dots.svg";
import WeVsVirusLogo from "../assets/wvv.png";
import Map from "./Map";
import Alert from "@material-ui/lab/Alert";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import {colors} from "../theme/theme";
import {isSupportedType, isValidPlace} from "./placesUtils";
import {ADD_PLACE, useAppContext} from "../context/AppContext";
import {usePosition} from "./useLocation";
import AlertDialog from "../components/AlertDialog";
import {useTranslation} from "react-i18next";

const defaultLocation = {lat: 53.551086, lng: 9.993682};

const useStyles = makeStyles(theme => ({
    preloader: {
        position: "absolute",
        zIndex: 0,
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    },
    toolBar: {
        backgroundColor: colors.white,
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2)'
    }
}));

const Preloader = () => {
    const classes = useStyles();
    return (
        <img className={classes.preloader} alt="Loading" width="180px" height="60px" src={Loading} />
    )
};

export default function HomeMap(props) {
    const classes = useStyles();
    const {t} = useTranslation();
    const [currentPlace, setCurrentPlace] = useState(null);
    const [center, setCenter] = useState(defaultLocation);
    const location = usePosition();
    const [{google, places, map, loading}, dispatch] = useAppContext();
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    let hideNotificationTimeoutId;
    const [isLocationLoadingTimedOut, setLocationLoadingTimedOut] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [pendingPlaceDetails, setPendingPlaceDetails] = useState(null);

    useEffect(() => {
        setTimeout(() => setLocationLoadingTimedOut(true), 2000);
    }, []);

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

    const isLoading = loading && !isLocationLoadingTimedOut;

    return (
        <>
        <BoxedMap>
            <Toolbar className={classes.toolBar} style={{zIndex: 3}}>
                <Search onSelected={selectSearch} location={location} />
            </Toolbar>
            <WeVsVirus style={{zIndex: 2}}>
                <img src={WeVsVirusLogo} alt="We versus virus project" />
            </WeVsVirus>
            {isLoading ? <Preloader/> : (
                <MapWrapper>
                    <Map
                        zoom={16}
                        center={center}
                        events={events}
                        google={google}
                    />
                </MapWrapper>
            )}

            <div className={classes.notificationWrapper}>
                {isNotificationVisible && (
                    <Alert severity="success" className={classes.notification}>{t('home.success.text')}</Alert>
                )}
            </div>
        </BoxedMap>
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
        </>
    )
}

const MapWrapper = styled.div`
    height: 100%;
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
        top: 75px;
    }
`;
