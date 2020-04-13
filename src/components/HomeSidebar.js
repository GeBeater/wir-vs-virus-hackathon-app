import {Button, Paper} from "@material-ui/core";
import CompanyList from "../pages/CompanyList";
import LastFive from "./LastFive";
import Hidden from "@material-ui/core/Hidden";
import React, {useState} from "react";
import {useAppContext} from "../context/AppContext";
import {makeStyles} from "@material-ui/styles";
import {spacing} from "../theme/theme";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
    sideBar: {
        width: "30%",
        padding: spacing.l,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    mobileSideBar: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "50%",
        padding: spacing.l,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 100
    },
}));

export const HomeSideBar = () => {
    const [{places}] = useAppContext();
    const {t} = useTranslation();
    const classes = useStyles();

    const [showMobileIntro, setShowMobileIntro] = useState(true);

    function toggleShowMobileIntro() {
        setShowMobileIntro(false);
    }

    return (
        <>
            <Hidden smUp implementation={"js"} >
                {(showMobileIntro) &&
                    <Paper className={classes.mobileSideBar} elevation={1}>
                        <header style={{flexGrow: 1}}>
                            <h1>{t('home.welcome.headline')}</h1>
                            <h3>{t('home.welcome.subline')}</h3>
                            <h3><b>1/</b> {t('home.welcome.step1')}</h3>
                            <h3><b>2/</b> {t('home.welcome.step2')}</h3>
                        </header>
                        <Button onClick={toggleShowMobileIntro}>Loslegen</Button>
                    </Paper>
                } : {
                    <MobileStartNow amount={places.length} />
                }
            </Hidden>
            <Hidden smDown implementation="js">
                <Paper className={classes.sideBar} elevation={1}>
                    <header style={{flexGrow: 1}}>
                        <h1>{t('home.welcome.headline')}</h1>
                        <h3>{t('home.welcome.subline')}</h3>
                        <h3><b>1/</b> {t('home.welcome.step1')}</h3>
                        <h3><b>2/</b> {t('home.welcome.step2')}</h3>
                    </header>
                    {places.length > 0 ? <CompanyList /> : <LastFive />}
                    <StartNow amount={places.length} />
                </Paper>
            </Hidden>
        </>
    )
};

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
    margin: auto;
    left: 0;
    right: 0;
`

