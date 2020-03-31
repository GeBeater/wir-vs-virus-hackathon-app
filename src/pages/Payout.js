import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../assets/cofund.svg';
import {fade} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {useCompanyContext} from "../context/CompanyContext";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.cofound.de">
                CoFund
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    disabled: {
        backgroundColor: fade(theme.palette.common.black, 0.05)
    },
    link: {
        cursor: 'pointer'
    }
}));

export default function Payout() {
    const {t} = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const [{invitationCode, place}] = useCompanyContext();
    const [form, setForm] = useState({data: {paypalEmail: null, bankAccountName: null, bankAccountIban: null, bankAccountBic: null}, valid: false});
    const [state, setState] = React.useState({
        usePaypal: true
    });

    useEffect(() => {
        if (!invitationCode || !place) {
            history.push('/anmeldung')
        }
    }, [invitationCode, place])

    const toggleState = () => {
        setState({usePaypal: !state.usePaypal});
        setForm({...form, valid: isValid(form.data)});
    };

    function isValid(data) {
        return state.usePaypal ? isValidPayPal(data) : isValidBank(data);
    }

    function isValidPayPal(data) {
        return data.paypalEmail && data.paypalEmail.length > 0;
    }

    function isValidBank(data) {
        return data.bankAccountName && data.bankAccountName.length > 0
                && data.bankAccountIban && data.bankAccountIban.length > 0
                && data.bankAccountBic && data.bankAccountBic.length > 0;
    }

    function setValue(name, value) {
        const newData = {...form.data, [name]: value};
        setForm({valid: isValid(newData), data: newData});
    }

    function requestPayout(event) {
        event.preventDefault();
        const requestData = state.usePaypal ? {
            paypalEmail: form.data.paypalEmail
        } : {
            bankAccountName: form.data.bankAccountName,
            bankAccountIban: form.data.bankAccountIban,
            bankAccountBic: form.data.bankAccountBic
        };
        requestData.placeId = place.id;
        fetch(`/api/payout/request`, {
            method: "POST", headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(requestData)
        }).then((response) => {
            if(response.status === 200) {
                history.push('/success')
            } else {
                alert("Something went wrong here")
            }
        });
    }

    function goBack() {
        history.push('/showmethemoney');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Link href="/" variant="body2">
                    <img src={Logo} style={{width: 128, height: 128}} alt="CoFund Logo" />
                </Link>
                <Typography component="h1" variant="h5">
                    Bitte gib deine Daten ein
                </Typography>

                <Typography component="div" className={classes.paper}>
                    <ButtonGroup color="primary" aria-label="contained primary button group">
                        <Button variant={state.usePaypal ? "contained" : "outlined"} onClick={toggleState}>PayPal</Button>
                        <Button variant={!state.usePaypal ? "contained" : "outlined"} onClick={toggleState}>Bank</Button>
                    </ButtonGroup>
                </Typography>

                <form className={classes.form} onSubmit={requestPayout}>
                    {state.usePaypal ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="paypalEmail"
                                    label={t('payout.paypalEmail')}
                                    name="paypalEmail"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(event) => setValue('paypalEmail', event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="bankAccountName"
                                    label={t('payout.payee')}
                                    name="bankAccountName"
                                    autoComplete="off"
                                    onChange={(event) => setValue('bankAccountName', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="bankAccountIban"
                                    label="IBAN"
                                    name="bankAccountIban"
                                    autoComplete="off"
                                    onChange={(event) => setValue('bankAccountIban', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="bankAccountBic"
                                    label="BIC"
                                    name="bankAccountBic"
                                    autoComplete="off"
                                    onChange={(event) => setValue('bankAccountBic', event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!form.valid}
                    >
                        {t('requestpayout')}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={goBack} className={classes.link} variant="body2">
                                {t('goback')}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
