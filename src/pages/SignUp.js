import {fade} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Logo from '../assets/cofund.svg';
import {useCompanyContext} from '../context/CompanyContext';
import {useTranslation} from "react-i18next";

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
    }
}));

export default function SignUp() {
    const {t} = useTranslation();
    const classes = useStyles();

    const [{invitationCode, place}] = useCompanyContext();
    const history = useHistory();
    const initialSlug = generateRandomSlug();
    const [form, setForm] = useState({data: {firstName: null, lastName: null, mail: null, slug: initialSlug}, valid: false});

    useEffect(() => {
        if (!invitationCode || !place) {
            history.push('/getit')
        }
    }, [invitationCode, place])

    function isValid(data) {
        return Object.keys(data).filter((key) => !data[key] || data[key].length === 0).length === 0;
    }

    function setValue(name, value) {
        const newData = {...form.data, [name]: value};
        setForm({valid: isValid(newData), data: newData});
    }

    function register(event) {
        event.preventDefault();
        const requestData = {
            invitationToken: invitationCode,
            firstName: form.data.firstName,
            lastName: form.data.lastName,
            email: form.data.mail,
            slug: form.data.slug
        }
        fetch('/api/entrepreneurs', {
            method: "POST", headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(requestData)
        }).then((response) => {
            if(response.status === 200) {
                history.push('/showmethemoney')
            } else {
                alert("Something went wrong here")
            }
        });
    }

    function generateRandomSlug() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {place &&
                <div className={classes.paper}>
                    <Link href="/" variant="body2">
                        <img src={Logo} style={{width: 128, height: 128}} alt="CoFund Logo" />
                    </Link>
                    <Typography component="h1" variant="h5">
                        Gib bitte deine Daten an
                </Typography>
                    <form className={classes.form} noValidate onSubmit={register}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField className={classes.disabled}
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    name="company"
                                    label="Unternehmen"
                                    type="company"
                                    id="company"
                                    value={place.company}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.disabled}
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    name="address"
                                    label="Addresse"
                                    type="address"
                                    id="address"
                                    value={place.address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField className={classes.disabled}
                                    autoComplete="zipCode"
                                    name="zipCode"
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    id="zipCode"
                                    label="Postleitzahl"
                                    autoComplete="zipCode"
                                    value={place.zip}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField className={classes.disabled}
                                    autoComplete="city"
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    id="city"
                                    label="Stadt"
                                    name="city"
                                    autoComplete="city"
                                    value={place.city}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Vorname"
                                    autoComplete="given-name"
                                    onChange={(event) => setValue('firstName', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Nachname"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(event) => setValue('lastName', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(event) => setValue('mail', event.target.value)}
                                />
                            </Grid>
                            {t('signup.slug.description')}
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="slug"
                                    label={t('signup.slug.label')}
                                    name="slug"
                                    defaultValue={initialSlug}
                                    onChange={(event) => setValue('slug', event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!form.valid}
                        >
                            {t('signup.button')}
                        </Button>
                    </form>
                </div>
            }
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
