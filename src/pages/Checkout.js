import {Button, Grid, TextField, Typography} from '@material-ui/core';
import DropIn from "braintree-web-drop-in-react";
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppContext} from "../context/AppContext";
import CompanyList from './CompanyList';

export default function Checkout() {
    const [token, setToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(null);

    const [{places}] = useAppContext();

    useEffect(() => {
        fetch("/api/payment/token", {method: 'POST'}).then(resp => {
            return resp.json();
        }).then(json => {
            setToken(json.token);
        });

    }, [])

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
            placeIdAmounts: request
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
    margin-top: 10%;
    justify-content: center;
    height: 100%;
`

const Container = styled.div`
    width: 60%;
`
