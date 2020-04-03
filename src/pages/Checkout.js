import {Button, Grid, TextField, Typography} from '@material-ui/core';
import DropIn from "braintree-web-drop-in-react";
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
import { useHistory, Link } from 'react-router-dom';
import Search from "../search/Search";

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
    const [token, setToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(0);
    const [brainTreeReady, setBrainTreeReady] = useState(false);
    const [paying, setPaying] = useState(false);
    const [isPayBtnEnabled, setIsPayBtnEnabled] = useState(false);
    const history = useHistory();

    const [{places}, dispatch] = useAppContext();

    const classes = useStyles();

    useEffect(() => {
        fetch("/api/payment/token", {method: 'POST'}).then(resp => {
            return resp.json();
        }).then(json => {
            setToken(json.token);
        });

    }, []);

    useEffect(() => {
        if (instance != null) {
            instance.on('paymentMethodRequestable', () => setBrainTreeReady(true))
            instance.on('noPaymentMethodRequestable', () => setBrainTreeReady(false))
        }
    }, [instance]);

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
    }

    async function pay() {
        setPaying(true)
        const {nonce} = await instance.requestPaymentMethod();
        const placeAmounts = places.reduce((acc, place) => {
            return {...acc, [place.details.place_id]: place.amount}
        }, {});
        const data = {
            nonce,
            amount: amount,
            placeIdAmounts: placeAmounts,
            places
        }
        fetch('/api/payment/checkout', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                history.push('/success');
            }
        })
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
            <ConatinerWrapper>
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
            </ConatinerWrapper>
            <ConatinerWrapper>
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
                                    disabled={!isPayBtnEnabled}
                                    className={classes.submitBtn}
                                >
                                    Weiter
                                </Button>
                            </form>
                        </Panel>
                        :
                        <Panel style={{width: "100%", gridArea: "right", padding: '20px 0'}}>
                            {token && amount && <DropIn
                                options={{
                                    authorization: token,
                                    locale: 'de_DE'
                                }}
                                onInstance={setInstance}
                            />
                            }
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={pay}
                                disabled={(paying || !brainTreeReady || places.length === 0 || !(amount > 0))}
                            >
                                Bezahlen
                            </Button>
                        </Panel>
                    }
                </Container>
                <Container step={step}>
                    <div style={{backgroundColor: colors.grayA05, borderRadius: '5px', padding: spacing.l, color: '#3E4650'}}>
                        <h1>Von dir direkt zum Betrieb – Wie das funktioniert:</h1>
                        <h3><b>1/</b> Wir sammeln die Beträge von dir und anderen die den Betrieb unterstützen möchten und verwalten diese Beträge treuhänderisch.</h3>
                        <h3><b>2/</b> Mit deiner Spende wird vollautomatisch ein Brief verschickt, der den Unternehmer über die Unterstützung informiert. </h3>
                        <h3><b>3/</b> Der Unternehmer besucht CoFund.de und kann die Unterstützung abrufen. Schnell, einfach, transparent und ohne Gebühren oder Verpflichtungen. </h3>
                        <h3><b>Derzeit laufen wir noch im Testbetrieb</b><br/>Um unsere Platform zu testen verwende einfach folgende Mastercard Nummer und ein Ablaufdatum in der Zukunft: 5555555555554444</h3>
                    </div>
                </Container>
            </ConatinerWrapper>
            <img src={Google} style={{position: "absolute", bottom: 10, left: 10}}></img>
        </Wrapper>
    )
}

const Panel = styled.div`
    padding: 20px;
`

const ConatinerWrapper = styled.div`
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
