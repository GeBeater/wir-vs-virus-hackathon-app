import {Button, Grid, TextField, Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {UPDATE_PLACES, useAppContext} from "../context/AppContext";
import CompanyList from './CompanyList';
import Back from "../assets/back.svg";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/cofund.svg";
import Google from "../assets/google.png";
import FAQ from "./FAQ";
import {colors, spacing} from "../theme/theme";
import InputAdornment from '@material-ui/core/InputAdornment';
import {Link} from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";

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
    overallAmountField: {
        marginBottom: 10
    },
    submitBtn: {
        marginTop: 10
    }
}));

export default function Checkout() {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(0);
    const [paying, setPaying] = useState(false);
    const [isPayBtnEnabled, setIsPayBtnEnabled] = useState(false);
    const [{places}, dispatch] = useAppContext();
    const classes = useStyles();

    useEffect(() => {
        let amount = 0;
        let allPlacesHaveAmount = true;
        places.forEach(p => {
            amount += parseFloat(p.amount);
            allPlacesHaveAmount = allPlacesHaveAmount && (p.amount > 0)
        });
        setAmount(Math.round(amount));
        setIsPayBtnEnabled(!!places.length && allPlacesHaveAmount);
    }, [places]);

    function startPayment(event) {
        event.preventDefault();
        setStep(2)
        requestPayoutLink();
    }

    async function requestPayoutLink() {
        setPaying(true);
        const placeAmounts = places.reduce((acc, place) => {
            return {...acc, [place.details.place_id]: place.amount}
        }, {});
        const data = {
            amount: amount,
            placeIdAmounts: placeAmounts,
            places
        };
        fetch('/api/payment/checkout', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json()
        }).then(checkoutResponse => {
            Object.defineProperty(window.location, 'href', {
                writable: true,
                value: checkoutResponse.redirectUrl
            });
            setPaying(false);
        }).catch((error) => {
            setPaying(false);
        });
    }

    const handleDistributeAmount = (evt) => {
        const newAmount = Math.round(evt.target.value / places.length * 100) / 100;
        const newPlaces = places.map(p => ({details: p.details, amount: newAmount}));
        dispatch({type: UPDATE_PLACES, payload:  newPlaces});
    };

    const handleKeyPressEnter = (evt) => {
        if (evt.key === 'Enter') {
            evt.target.blur();
            evt.preventDefault();
        }
    };

    return (
        <Wrapper>
            <div className={classes.root} style={{position: "fixed", top: 0, left: 0, width: '100%'}}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <Button component={Link} to="/">
                            <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                        </Button>
                        <div style={{width: '100%'}}></div>
                        <FAQ />
                    </Toolbar>
                </AppBar>
            </div>
            <ContainerWrapper>
                <TitleContainer>
                    <Button component={Link} to="/">
                        <img src={Back} style={{width: 20, height: 20, marginRight: '8px'}} alt="Back Icon" />
                        <span style={{color: colors.grayA50}}>Zurück</span>
                    </Button>
                    <header style={{gridArea: "header", textAlign: "left", marginBottom: "40px", color: '#3E4650'}}>
                        <Typography component="h1" variant="h4">
                            Klasse!
                        </Typography>
                        <Typography component="h1" variant="h4" style={{color: '#3E4650'}}>
                            Sag uns noch mit wie viel du unterstützen möchtest
                        </Typography>
                    </header>
                </TitleContainer>
            </ContainerWrapper>
            <ContainerWrapper>
                <Container>
                    {step === 1 ?
                        <Panel style={{width: "100%", gridArea: "left", padding: '0'}}>
                            <form noValidate onSubmit={startPayment}>
                                <Grid container spacing={2} className={classes.overallAmountField}>
                                    <Grid item xs={12}>
                                        <TextField style={{marginBottom: spacing.m}}
                                        variant="outlined"
                                        fullWidth
                                        label="Gesamtbetrag"
                                        name="donation"
                                        type="number"
                                        id="donation"
                                        autoFocus
                                        onChange={handleDistributeAmount}
                                        value={parseFloat(amount)}
                                        onKeyPress={handleKeyPressEnter}
                                        InputProps={{
                                            inputProps: { min: 0, max: 9999 },
                                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                        }}
                                        />
                                    </Grid>
                                </Grid>
                                <CompanyList showInputs={true} />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!isPayBtnEnabled || (paying || places.length === 0 || !(amount > 0))}
                                    className={classes.submitBtn}
                                >
                                    Bezahlen
                                </Button>
                            </form>
                        </Panel>
                        :
                        <CircularProgress/>
                    }
                </Container>
                <Container step={step}>
                    <div style={{backgroundColor: colors.grayA05, borderRadius: '5px', padding: spacing.l, color: '#3E4650'}}>
                        <h1>Von dir direkt zum Betrieb – Wie das funktioniert:</h1>
                        <h3><b>1/</b> Wir sammeln die Beträge von dir und anderen die den Betrieb unterstützen möchten und verwalten diese Beträge treuhänderisch.</h3>
                        <h3><b>2/</b> Mit deiner Spende wird vollautomatisch ein Brief verschickt, der den Unternehmer über die Unterstützung informiert. </h3>
                        <h3><b>3/</b> Der Unternehmer besucht CoFund.de und kann die Unterstützung abrufen. Schnell, einfach, transparent und ohne Gebühren oder Verpflichtungen. </h3>
                        <h3><b>Derzeit laufen wir noch im Testbetrieb</b><br/>Um unsere Platform zu testen verwende einfach folgende Visa Nummer 4444 3333 2222 1111, gültig bis 03/2030 und Verification Code 737</h3>
                    </div>
                </Container>
            </ContainerWrapper>
            <img src={Google} style={{position: "absolute", bottom: 10, left: 10}}></img>
        </Wrapper>
    )
}

const Panel = styled.div`
    padding: 20px;
`

const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-start;
    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
    }

    max-width: 1000px;
    @media (max-width: 1200px) {
        margin: 0 15px;
        padding-top: 45px;
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    @media (min-width: 768px) {
      padding-top: 120px;
      padding-bottom: 60px;
    }
    align-items: center;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
`

const Container = styled.div`
    padding: 0 20px;
    margin-top: 20px;
    width: 100%;
    @media (max-width: 768px) {
        left: 5px;
        right: 5px;
        width: 100%;
    }
`

const TitleContainer = styled.div`
    padding: 0 20px;
    margin-top: 20px;
    width: 50%;
    @media (max-width: 1000px) {
        left: 5px;
        right: 5px;
        width: 100%;
    }
`
