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
import FAQ from './FAQ';
import {usePosition} from '../maps/useLocation';
import Search from "../search/Search";
import {colors, spacing} from "../theme/theme";
import CompanyList from "./CompanyList";
import {isSupportedType, isValidPlace} from "../maps/placesUtils";
import AlertDialog from "../components/AlertDialog";
import Alert from "@material-ui/lab/Alert";
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

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
    const detectMobile = useMobileDetect();
    const classes = useStyles();
    const [currentPlace, setCurrentPlace] = useState(null);
    const [center, setCenter] = useState(defaultLocation)
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

    useEffect(selectCurrentPlace, [currentPlace])
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
            dispatch({type: ADD_PLACE, payload: pendingPlaceDetails});
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
        if (currentPlace && places.filter(place => place.place_id === currentPlace).length === 0) {
            const service = new google.maps.places.PlacesService(map);
            service.getDetails({
                placeId: currentPlace,
                fields: ['id', 'name', 'place_id', 'icon', 'address_components', 'types', 'photos']
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

                dispatch({type: ADD_PLACE, payload: details});
                showSuccessNotification();
            });
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <Container>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                        <Search onSelected={setCenter} />
                        <FAQ />
                    </Toolbar>
                </AppBar>
            </div>
            <MapContainer>
                {!detectMobile.isMobile() && <Paper className={classes.paper}>
                    <header style={{flexGrow: 1}}>
                        <h1><div>Hallo Unterstützer!</div></h1>
                        <h3>Gemeinsam unterstützen wir mit CoFund.de in der Corona Krise Unternehmen schnell und einfach:</h3>
                        <h3><b>1/</b> Unternehmen auf der Karte wählen</h3>
                        <h3><b>2/</b> Betrag festlegen</h3>
                        <h3><b>3/</b> Mit PayPal spenden</h3>
                    </header>
                    <CompanyList />
                    <StartNow amount={places.length} />
                </Paper>
                }
                <BoxedMap>
                    <img style={{position: "absolute", zIndex: 0, top: "50%", left: "50%", marginLeft: "-80px", marginTop: "-30px"}} alt="We are loading" width="180px" height="60px" src={Loading}></img>
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
                            <Alert severity="success" className={classes.notification}>Branch successfully added</Alert>
                        )}
                    </div>
                </BoxedMap>
            </MapContainer>
            {detectMobile.isMobile() && <MobileStartNow amount={places.length} />}
            {isAlertVisible && (
                <AlertDialog
                    title={'Error'}
                    message={'The place you selected is invalid and cannot be added, sorry.'}
                    agree={'OK'}
                    handleAgree={handleAlertAgree}
                />
            )}
            {isDialogVisible && (
                <AlertDialog
                    title={'Warning'}
                    message={'The place you selected seems to be of an unusual type. Do you want to add it anyway?'}
                    agree={'Yes'}
                    disagree={'No'}
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
