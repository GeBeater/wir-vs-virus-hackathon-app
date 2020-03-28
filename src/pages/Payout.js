import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/core/styles/withStyles";
import Container from '@material-ui/core/Container';
import Logo from '../assets/cofund.svg';
import {fade} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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

export default function Payout() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        usePaypal: true
    });
    const toggleButtons = () => {
        setState({ ...state, usePaypal: !state.usePaypal });
    };

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
                        <Button variant={state.usePaypal ? "contained" : "outlined"} onClick={toggleButtons}>PayPal</Button>
                        <Button variant={!state.usePaypal ? "contained" : "outlined"} onClick={toggleButtons}>Bank</Button>
                    </ButtonGroup>
                </Typography>

                <form className={classes.form} noValidate>

                    {state.usePaypal ? (

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
                    ) : (
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
                    )}
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

const AntSwitch = withStyles(theme => ({
    root: {
        width: 36,
        height: 20,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 16,
        height: 16,
        boxShadow: 'none',
    },
    track: {
        borderRadius: 20 / 2,
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
    },
    checked: {},
}))(Switch);
