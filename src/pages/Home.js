import {Button, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from "react-router-dom";
import styled from "styled-components";
import useMobileDetect from 'use-mobile-detect-hook';
import LastFive from "../components/LastFive";
import {useAppContext} from "../context/AppContext";
import {spacing} from "../theme/theme";
import CompanyList from "./CompanyList";
import HeaderBar from "../components/HeaderBar";
import HomeMap from "../maps/HomeMap";

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 3
    },
    sideBar: {
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
    const [{places}] = useAppContext();

    return (
        <Container>
            <div className={classes.root}>
                <HeaderBar />
            </div>
            <MapContainer>
                {!detectMobile.isMobile() && (
                    <Paper className={classes.sideBar} elevation={1}>
                        <header style={{flexGrow: 1}}>
                            <h1>{t('home.welcome.headline')}</h1>
                            <h3>{t('home.welcome.subline')}</h3>
                            <h3><b>1/</b> {t('home.welcome.step1')}</h3>
                            <h3><b>2/</b> {t('home.welcome.step2')}</h3>
                            <h3><b>3/</b> {t('home.welcome.step3')}</h3>
                        </header>
                        {places.length > 0 ? <CompanyList /> : <LastFive />}
                        <StartNow amount={places.length} />
                    </Paper>)
                }
                <HomeMap />
            </MapContainer>
            {detectMobile.isMobile() && <MobileStartNow amount={places.length} />}
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
