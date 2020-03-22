import {Button, Grid, TextField, Typography} from '@material-ui/core';
import DropIn from "braintree-web-drop-in-react";
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppContext} from "../context/AppContext";
import CompanyList from './CompanyList';
import Back from "../assets/back.svg";
import {Link} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/cofund.svg";
import Help from "../assets/help-icon.svg";
import Search from "../search/Search";
import {colors, spacing} from "../theme/theme";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    faq: {
        color: colors.grayA50,
        fontFamily: 'Montserrat',
        fontWeight: '600'
    }
}));

export default function Checkout() {
    const [token, setToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(0);
    const [brainTreeReady, setBrainTreeReady] = useState(false);

    const [{places}] = useAppContext();

    const classes = useStyles();

    useEffect(() => {
        fetch("/api/payment/token", {method: 'POST'}).then(resp => {
            return resp.json();
        }).then(json => {
            setToken(json.token);
        });

    }, [])

    useEffect(() => {
        if (instance != null) {
            instance.on('paymentMethodRequestable', () => setBrainTreeReady(true))
            instance.on('noPaymentMethodRequestable', () => setBrainTreeReady(false))
        }
    }, [instance])

    function startPayment(event) {
        event.preventDefault();
        setStep(2)
    }

    async function pay() {
        const {nonce} = await instance.requestPaymentMethod();
        const request = places.reduce((acc, place) => {
            return {...acc, [place.place_id]: amount / places.length}
        }, {});
        const data = {
            nonce,
            amount: amount,
            placeIdAmounts: request,
            places
        }
        await fetch('/api/payment/checkout', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    return (
        <Wrapper>
               
                <div className={classes.root} style={{position: "fixed", top: 0, left: 0, width: '100%'}}>
                    <AppBar position="static">
                        <Toolbar className={classes.toolbar}>
                            <img src={Logo} style={{width: 40, height: 40}} alt="CoFund Logo" />
                            <div style={{width: '100%'}}></div>
                            <Button style={{marginLeft: spacing.s, padding: '10px 10px'}}>
                                <img src={Help} style={{width: 20, height: 20, marginRight: '8px'}} alt="Help Icon" />
                                <span className={classes.faq}>FAQ</span>
                            </Button>
                        </Toolbar>
                    </AppBar>
                </div>

            <Container step={step}>
                <Button href='/'>
                    <span>Back</span>
                </Button>
                <header style={{gridArea: "header", textAlign: "left", marginBottom: "30px"}}>
                    <Typography component="h1" variant="h4">
                        Good Choice!
                        </Typography>
                    <Typography component="h1" variant="h4">
                        Tell us how much money you would like to donate
                        </Typography>
                </header>
                {step === 1 ?
                    <Panel style={{width: "100%", gridArea: "left", padding: '0'}}>
                        <form noValidate onSubmit={startPayment}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"
                                    fullWidth
                                    required
                                    label="Enter amount"
                                    name="donation"
                                    type="number"
                                    id="donation"
                                    autoFocus
                                    onChange={(event) => setAmount(event.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                    }}
                                    variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <CompanyList></CompanyList>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={(amount > 0 && places.length > 0) ? false : true}
                            >
                                Continue
                            </Button>
                        </form>
                    </Panel>
                    :
                    <Panel style={{width: "100%", gridArea: "right"}}>
                        {token && amount && <DropIn
                            options={{
                                authorization: token,
                                paypal: {
                                    flow: 'checkout',
                                    amount: amount,
                                    currency: 'EUR',
                                    commit: true
                                }
                            }}
                            onInstance={setInstance}
                        />
                        }
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={pay}
                            disabled={(!brainTreeReady || places.length === 0 || !(amount > 0))}
                        >
                            Pay now
                        </Button>
                    </Panel>
                }
            </Container>
            <Container step={step}>
                <div style={{backgroundColor: colors.grayA05, borderRadius: '5px', padding: spacing.l, color: colors.grayA50}}>
                    <h1>Your donation arrives - How it works</h1>
                    <h3><b>1/</b> Lorem ipsum dolor sit amet, conseteturtua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</h3>
                    <h3><b>2/</b> Lorem ipsum dolor sit auptu amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna </h3>
                </div>
            </Container>
        </Wrapper>
    )
}

const Panel = styled.div`
    padding: 20px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    margin: 0 10%;
`

const Container = styled.div`
    padding: 0 20px;
    margin-top: 100px;
    width: 60%;
    @media (max-width: 768px) { 
        left: 5px;
        right: 5px;
        width: 90%;
    }
`

const BackButton = styled.img`
    width: 40px;
    height: 40px;
    &:hover{
        opacity: 0.6;
    }
`