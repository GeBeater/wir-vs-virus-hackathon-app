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
import React from 'react';
import Logo from '../assets/cofund.svg';

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

export default function PayoutDetails() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        paypal: true,
        bankaccount: false,
        creditcard: false,
    });

    const handleChange = event => {
        setState({ ...state, paypal: false });
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log(event.target.name);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Link href="/" variant="body2">
                    <img src={Logo} style={{width: 128, height: 128}} alt="CoFund Logo" />
                </Link>
                <Typography component="h1" variant="h5">
                    Enter payout details
                </Typography>


                <form className={classes.form} noValidate>
                    {/*
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="bankAccountName"
                                label="Name"
                                name="bankAccountName"
                                autoComplete="bankAccountName"
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
                                autoComplete="bankAccountIban"
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
                                autoComplete="bankAccountBic"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="cardName"
                                label="Name on card"
                                name="cardName"
                                autoComplete="cardName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                variant="outlined"
                                required
                                fullWidth
                                id="cardNumber"
                                label="Card Number"
                                name="cardNumber"
                                autoComplete="cardNumber"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0, max: 12 } }}
                                variant="outlined"
                                required
                                fullWidth
                                id="cardExpiryMonth"
                                label="Month"
                                name="cardExpiryMonth"
                                autoComplete="cardExpiryMonth"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0, max: 99 } }}
                                variant="outlined"
                                required
                                fullWidth
                                id="cardExpiryYear"
                                label="Year"
                                name="cardExpiryYear"
                                autoComplete="cardExpiryYear"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                InputProps={{ inputProps: { min: 0, max: 999 } }}
                                variant="outlined"
                                required
                                fullWidth
                                id="cardValidationNumber"
                                label="Validation number"
                                name="cardValidationNumber"
                                type="number"
                                autoComplete="cardValidationNumber"
                            />
                        </Grid>
                    </Grid>
                    */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="paypalEmail"
                                label="Paypal Email Address"
                                name="paypalEmail"
                                autoComplete="paypalEmail"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/showmethemoney" variant="body2">
                                Go back
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
