import {Button, Grid, TextField, Typography} from '@material-ui/core';
import DropIn from "braintree-web-drop-in-react";
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppContext} from "../context/AppContext";
import CompanyList from './CompanyList';
import Back from "../assets/back.svg";
import {Link} from 'react-router-dom';

export default function Checkout() {
    const [token, setToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(0);
    const [brainTreeReady, setBrainTreeReady] = useState(false);

    const [{places}] = useAppContext();

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
            <Link to="/" style={{position: "absolute", top: 20, left: 20}}>
                <BackButton src={Back} alt="Back to map" />
            </Link>
            <Container step={step}>
                <header style={{gridArea: "header", textAlign: "center", marginBottom: "30px"}}>
                    <Typography component="h1" variant="h4">
                        Good Choice!
                        </Typography>
                    <Typography component="h1" variant="h4">
                        Tell us how much money you would like to donate
                        </Typography>
                </header>
                {step === 1 ?
                    <Panel style={{width: "100%", gridArea: "left"}}>
                        <form noValidate onSubmit={startPayment}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="donation"
                                        label="Your Amount"
                                        type="number"
                                        id="donation"
                                        onChange={(event) => setAmount(event.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                            </Grid>
                            <CompanyList />
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
        </Wrapper>
    )
}

const Panel = styled.div`
    padding: 20px;
`

const Wrapper = styled.div`
    display: flex;
    padding-top: 10%;
    justify-content: center;
    height: 100%;
    max-height: 100%;
`

const Container = styled.div`
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
